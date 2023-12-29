<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $table = 'notification';
    protected $fillable = [
        'message',
        'status',
        'user_id'
    ];

    public static function triggerNotification($userId, $message)
    {

        $notificationLimit = 25;

        if (self::where('user_id', $userId)->count() >= $notificationLimit) {
            $oldestNotification = self::where('user_id', $userId)
                ->orderBy('created_at', 'asc')
                ->first();

            if ($oldestNotification) {
                $oldestNotification->delete();
            }
        }
        self::create([
            'message' => $message,
            'user_id' => $userId,
            'status' => 'delivered',
        ]);

        $user = User::find($userId);
        $user->notification_unread++;
        $user->save();
    }
}
