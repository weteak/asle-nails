<?
namespace App\Services\Auth;

use App\Contracts\Auth\RegistrationServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

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
        // Validation logic here
    }

    private function handleInvitation(User $user, $invitationToken)
    {
        // Invitation handling logic here
    }
}
