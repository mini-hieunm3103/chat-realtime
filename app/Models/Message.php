<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'content',
        'channel_id',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function reactions()
    {
        return $this->belongsToMany(Emoji::class, 'reactions', 'message_id', 'emoji_id');
    }
    public function file()
    {
        return $this->belongsTo(File::class, 'file_id');
    }
}
