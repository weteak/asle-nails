<?php
namespace App\Services\Auth;

use App\Contracts\RegistrationServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RegistrationService implements RegistrationServiceInterface
{
    public function getInviteCode($inviteQuery)
    {
        return $inviteQuery ? User::where('invitation_token', $inviteQuery)->value('invitation_token') : null;
    }

    public function registerUser(array $userData)
    {
        $this->validateUserData($userData);

        $userData['password'] = Hash::make($userData['password']);
        $userData['invitation_token'] = \Str::random(20);
        $userData['notification_unread'] = 0;

        $user = User::create($userData);

        if (isset($userData['isInvited'])) {
            $this->handleInvitation($user, $userData['isInvited']);
        }

        return $user;
    }

    private function validateUserData(array $userData)
    {
        $validator = Validator::make($userData, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|digits_between:10,15',
        ]);
    
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    private function handleInvitation(User $newUser, $invitationToken)
    {
        $inviter = User::where('invitation_token', $invitationToken)->first();
    
        if (!$inviter) {
            // Handle the case where the invitation token does not correspond to any user.
            return;
        }
    
        // Create or update the invitation record
        $invitation = Invitation::updateOrCreate(
            ['inviter_id' => $inviter->id, 'invitee_id' => $newUser->id],
            ['status' => 'accepted'] // Or any other fields you need to update
        );
    
        // Additional logic if needed, like sending notifications or emails
    }
}
