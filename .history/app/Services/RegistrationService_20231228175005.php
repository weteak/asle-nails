<?php
namespace App\Services\Auth;

use App\Contracts\RegistrationServiceInterface;
use App\Models\AsleCard;
use App\Models\Invitation;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * Service class for handling user registration.
 */
class RegistrationService implements RegistrationServiceInterface
{

    /**
     * The notification service instance.
     *
     * @var NotificationService
     */
    protected $notificationService;

    /**
     * Create a new service instance.
     *
     * @param NotificationService $notificationService Dependency injection of NotificationService.
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }


    /**
     * Retrieve the invitation code if it exists.
     *
     * @param string $inviteQuery The invitation query parameter.
     * @return string|null The invitation token or null if not found.
     */
    public function getInviteCode($inviteQuery)
    {
        return $inviteQuery ? User::where('invitation_token', $inviteQuery)->value('invitation_token') : null;
    }

    /**
     * Register a new user with provided data.
     *
     * @param array $userData Data for the new user.
     * @return User The created user instance.
     * @throws ValidationException If validation fails.
     */
    public function registerUser(array $userData)
    {
        $this->validateUserData($userData);

        $userData['password'] = Hash::make($userData['password']);
        $userData['role'] = 'user';
        $userData['invitation_token'] = \Str::random(20);
        $userData['notification_unread'] = 0;

        $user = User::create($userData);

        

        if (isset($userData['isInvited'])) {
            $this->handleInvitation($user, $userData['isInvited']);
        }

        return $user;
    }

    /**
     * Validate user data.
     *
     * @param array $userData User data to validate.
     * @throws ValidationException If validation fails.
     */
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

    /**
     * Handle the invitation process for the new user.
     *
     * @param User $newUser The new user instance.
     * @param string $invitationToken The invitation token.
     */
    private function handleInvitation(User $newUser, $invitationToken)
    {
        $inviter = User::where('invitation_token', $invitationToken)->first();

        if (!$inviter) {
            return;
        }

        $invitation = Invitation::updateOrCreate(
            [
                'inviter' => $inviter->id,
                'accepted_by' => $newUser->id
            ],
        );

        if ($invitation) {
            $this->winPoints($inviter->id);
        }
    }

    /**
     * Award points to a user for a successful invitation.
     *
     * @param int $userId ID of the user to award points.
     */
    private function winPoints($userId)
    {
        $card = AsleCard::where('user_id', $userId)->first();
        if ($card) {
            $card->points = $card->points + 2;
            $card->save();
        }
    }



}

