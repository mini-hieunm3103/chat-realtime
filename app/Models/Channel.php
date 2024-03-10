<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'type'
    ];
    public function users() {
        return $this->belongsToMany(User::class, 'user_channel');
    }
    // get channel messages
    public function messages()
    {
        return $this->hasMany(Message::class)->select('user_id', 'content', 'created_at')->latest();
    }
}
