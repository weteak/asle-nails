<?php

namespace App\Services;

use App\Models\Notification;

/**
 * Class NotificationService
 *
 * Service class for handling notifications.
 */
class NotificationService
{
    /**
     * User ID for the notification.
     *
     * @var int
     */
    protected $userId;

    /**
     * User name associated with the notification.
     *
     * @var string
     */
    protected $userName;

    /**
     * Points associated with the notification.
     *
     * @var int
     */
    protected $points;

    /**
     * List of predefined notification messages.
     *
     * @var array
     */
    public $messagesList = [
        'isSubscribed' => 'Congratulations! You are now a new member of Asle Cards. Stay tuned for many exciting gifts.',
        'unSubscribed' => 'You have successfully unsubscribed from Asle Card.',
        'QRPoints' => 'You have gained +%s points to your Asle Card after generating your QR code.',
        'invitedByLink' => ':username has created an Asle Nails account using your invitation link.',
        'registerInvited' => 'You have gained +2 points on your Asle Card.',
        'registration' => ':username, welcome to Asle Nails!',
        'transferSender' => 'Congratulations! You have successfully transferred +%s points to your friend, :username.',
        'transferReceiver' => 'Congratulations! You have received a transfer of +%s points from your friend, :username.',
        'appointments'=>'Your have prevent a appointment in :name',
        'appointmentsUsedPoints'=>''
    ];



    /**
     * Set the user ID for the notification.
     *
     * @param int $userId User ID for the notification.
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;
    }

    /**
     * Set the notification message.
     *
     * @param string $points Notification message.
     */
    public function setPoints($points)
    {
        $this->points = $points;
    }

    /**
     * Set the user name associated with the notification.
     *
     * @param string $userName User name associated with the notification.
     */
    public function setUserName($userName)
    {
        $this->userName = $userName;
    }

    /**
     * Trigger the notification with the specified key.
     *
     * @param string $key Notification message key.
     */
    public function trigger($key)
    {
        $formattedMessage = $this->formatMessage($key);
        Notification::triggerNotification($this->userId, $formattedMessage);
    }

    /**
     * Format the notification message based on the key.
     *
     * @param string $key Notification message key.
     *
     * @return string Formatted notification message.
     */
    protected function formatMessage($key)
    {
        if (array_key_exists($key, $this->messagesList)) {
            $message = $this->messagesList[$key];

            if (strpos($message, ':username') !== false && isset($this->userName)) {
                $message = str_replace(':username', $this->userName, $message);
            }

            if (strpos($message, '%s') !== false && isset($this->points)) {
                return sprintf($message, $this->points);
            }

            return $message; 
        }

        return 'Invalid message key';
    }

}
