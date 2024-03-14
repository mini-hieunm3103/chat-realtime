<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'topic',
        'description',
        'owner',
        'approval',
        'channel_id'
    ];
    public function admins()
    {
        return $this->belongsToMany(User::class, 'admin_group');
    }
    public function channel()
    {
        return $this->hasOne(Channel::class, 'channel_id');
    }
}
