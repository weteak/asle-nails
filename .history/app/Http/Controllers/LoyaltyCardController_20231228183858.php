<?php

namespace App\Http\Controllers;

use App\Models\AsleCard;
use App\Models\Invitation;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;



class LoyaltyCardController extends Controller
{
    //

    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function show()
    {
        $data = [];
        $clients = User::where('role', 'user')->get();

        foreach ($clients as $client) {
            $asleCard = AsleCard::where('user_id', $client->id)->first();

            $data[] = [
                'id' => $client->id,
                'client_name' => $client->name,
                'asle_card' => $asleCard,
            ];
        }


        return Inertia::render('AsleCard/Cards', [
            'clients' => $data,
        ]);
    }

    public function userSection(Request $request)
    {
        $userId = $request->user()->id;
        $asleCard = AsleCard::where('user_id', $userId)->first();
        $groupInvitations = Invitation::where('inviter', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $acceptedInvitations = Invitation::where('accepted_by', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $group = $groupInvitations->merge($acceptedInvitations)
            ->unique('id')
            ->values();

        $friends = [];

        foreach ($group as $friend) {

            $id = $friend->accepted_by === $userId ? $friend->inviter : $friend->accepted_by;
            $hasCard = AsleCard::where('user_id', $id)->exists();
            $userName = User::where('id', $id)->value('name');

            $friends[] = [
                'user_id' => $id,
                'username' => $userName,
                'hasCard' => $hasCard,
            ];
        }

        $data = [
            'id' => $userId,
            'client_name' => $request->user()->name,
            'asle_card' => $asleCard,
            'friends' => $friends,
        ];

        dd($data);
        return Inertia::render('User/Loyalty', compact('data'));
    }


    public function transferCredit(Request $request)
    {
        $request->validate([
            'credit' => 'required|integer|min:1',
            'receiver' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $sender = AsleCard::where('user_id', auth()->user()->id)->first();
            $receiver = AsleCard::where('user_id', $request->receiver)->first();

            if ($sender->points < $request->credit) {
                return redirect()->back()->with('error', 'Insufficient points for the transfer.');
            }


            $sender->points = $sender->points - $request->credit;
            $receiver->points = $receiver->points + $request->credit;

            $sender->save();
            $receiver->save();


            DB::commit();


            $receiverName = User::find($receiver->user_id)->name;

            $this->notificationService->setUserId(auth()->user()->id);
            $this->notificationService->setPoints($request->credit);
            $this->notificationService->setUserName($receiverName);
            $this->notificationService->trigger('transferSender');


            $this->notificationService->setUserId($receiver->user_id);
            $this->notificationService->setUserName(auth()->user()->name);
            $this->notificationService->trigger('transferReceiver');



            \Illuminate\Support\Facades\Log::info('Credit transfer initiated', [
                'sender_id' => $sender->user_id,
                'receiver_id' => $receiver->user_id,
                'credit' => $request->credit,
            ]);

            return Redirect::route('loyalty.show');
        } catch (\Exception $e) {
            // Log or handle the exception
            DB::rollBack();

            return redirect()->back()->with('error', 'An error occurred during the transfer.');
        }
    }



    public function returnPointsView($token)
    {
        $cardData = AsleCard::where('unique_token', $token)->first();
        $data = null;

        if ($cardData) {
            $data = [
                'client_name' => User::find($cardData->user_id)->name,
                'asle_card' => $cardData,
            ];
        }

        return Inertia::render('AsleCard/GainPoints',
            ['token' => $token, 'card_data' => $data]);
    }
    public function gainPoints($token, $points)
    {
        $userCard = AsleCard::where('unique_token', $token)->first();

        if ($userCard) {
            $userCard->points += $points;
            $userCard->save();
        }

        $this->notificationService->setUserId($userCard->user_id);
        $this->notificationService->setPoints($points);
        $this->notificationService->trigger('QRPoints');

    }



    public function subscribe($userId)
    {

        $existingCard = AsleCard::where('unique_token', 'LIKE', 'AS-CARD%')
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->first();

        if ($existingCard) {
            return response()->json(['message' => 'Card already exists for this user', 'data' => $existingCard], 422);
        }

        $uniqueToken = "AS-CARD" . uniqid();
        $subscriptionJoined = now();
        $formattedSubscriptionJoined = $subscriptionJoined->toDateTimeString();
        $subscriptionExpiration = now()->addYear();
        $formattedSubscriptionExpiration = $subscriptionExpiration->toDateTimeString();

        $points = 0;

        AsleCard::create([
            'unique_token' => $uniqueToken,
            'subscription_joined' => $formattedSubscriptionJoined,
            'subscription_expiration' => $formattedSubscriptionExpiration,
            'points' => $points,
            'user_id' => $userId,
        ]);

        $this->notificationService->setUserId($userId);
        $this->notificationService->trigger('isSubscribed');

        return Redirect::route('cards.show');
    }

    public function unSubscribe($id)
    {
        $card = AsleCard::findOrFail($id);
        if ($card) {
            $this->notificationService->setUserId($card->user_id);
            $this->notificationService->trigger('unSubscribed');
            $card->delete();
        }

        return Redirect::route('cards.show');
    }
}
