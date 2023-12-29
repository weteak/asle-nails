<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AsleCard;
use App\Models\Invitation;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        $query = $request->query('invite');

        if (!$query) {
            return Inertia::render('Auth/Register', ['invite_code' => null]);
        }

        $invite_code = User::where('invitation_token', $query)->value('invitation_token');

        return Inertia::render('Auth/Register', ['invite_code' => $invite_code]);
    }


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $token = \Str::random(20);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|integer',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'profile_image' => null,
            'invitation_token' => $token,
            'notification_unread' => 0
        ]);

        if($request->isInvited)
        {
            $sender = User::where('id')
            $this->manageInvitaion($user);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    private function manageInvitaion($sender, $accepter)
    {

        Invitation::create([
            'inviter' => $sender,
            'accepted_by' => $accepter
        ]);
    }

    private function winPoints($userId)
    {
        $card = AsleCard::where('user_id', $userId)->first();
        if ($card) {
            $card->points = $card->points + 2;
            $card->save();
        }

    }
}
