<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsleCard extends Model
{
    use HasFactory;
    protected $table = "asle_card";
    protected $fillable = ['unique_token', 'subscription_joined', 'subscription_expiration','points', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
