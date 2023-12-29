<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;


class NotificationController extends Controller
{
    //
    public function show()
    {
        $notifications = Notification::where('user_id', auth()->user()->id)->latest()->get();
        return Inertia::render('Notifications/Notifications', ['notifications' => $notifications]);
    }

    public function readAllNotifications()
    {
        $currentUser = auth()->user();
        $currentUser->notification_unread = 0;
        $currentUser->save();
    }

    public function clearAllNotifications()
    {
        Notification::where('user_id', auth()->user()->id)->delete();
    }

}
