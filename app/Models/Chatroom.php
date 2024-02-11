<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'topic',
        'description',
        'user_id'
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_chatroom');
    }
}
