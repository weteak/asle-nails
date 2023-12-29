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


    protected $redirectLink;


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
     * Points associated with the notification.
     *
     * @var string
     */
    protected $date;


    /**
     * Points associated with the notification.
     *
     * @var string
     */
    protected $time;



    /**
     * Points associated with the notification.
     *
     * @var string
     */
    protected $service;


    /**
     * Points associated with the notification.
     *
     * @var string
     */
    protected $slug;




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
        'appointments' => 'Your application for a meeting on :date at :time has been accepted. The service is :service',
        'appointmentsUsedPoints' => '-%s points have been deducted from your card after you used them for digital payment for your appointment.',
        'appointmentUpdated' =>
            ['message' => 'Your appointment scheduled for :date at :time has been successfully updated. Click here to view the updated details.',
             'redirect' => " /appointment/:slug"]
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

    public function setRedirectLink($redirectLink)
    {
        $this->redirectLink = $redirectLink;
    }


    /**
     * Set the date for the notification.
     *
     * @param string $date date for the notification.
     */
    public function setDate($date)
    {
        $this->date = $date;
    }


       /**
     * Set the date for the notification.
     *
     * @param string $slug date for the notification.
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
    }


    /**
     * Set the time the notification.
     *
     * @param string $time time for the notification.
     */
    public function setTime($time)
    {
        $this->time = $time;
    }

    /**
     * Set the service for the notification.
     *
     * @param string $service service for the notification.
     */
    public function setService($service)
    {
        $this->service = $service;
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

    protected function formatMessage($key)
    {
        if (array_key_exists($key, $this->messagesList)) {
            $message = $this->messagesList[$key];

            if (is_array($message)) {
                $formattedMessage = $this->replacePlaceholders($message['message']);
                if (isset($message['redirect']) && isset($this->slug)) {
                    $formattedMessage .= ' ' . str_replace(':slug', $this->slug, $message['redirect']);
                }
                return $formattedMessage;
            } else {
                return $this->replacePlaceholders($message);
            }
        }

        return 'Invalid message key';
    }

    protected function replacePlaceholders($message)
    {
        if (strpos($message, ':username') !== false && isset($this->userName)) {
            $message = str_replace(':username', $this->userName, $message);
        }
        if (strpos($message, ':date') !== false && isset($this->date)) {
            $message = str_replace(':date', $this->date, $message);
        }
        if (strpos($message, ':time') !== false && isset($this->time)) {
            $message = str_replace(':time', $this->time, $message);
        }
        if (strpos($message, ':service') !== false && isset($this->service)) {
            $message = str_replace(':service', $this->service, $message);
        }
        if (strpos($message, '%s') !== false && isset($this->points)) {
            $message = sprintf($message, $this->points);
        }
        return $message;
    }

}
