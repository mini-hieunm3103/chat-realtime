<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'owner',
        'channel_id'
    ];
    public function admins()
    {
        return $this->belongsToMany(User::class, 'group_admin');
    }
    public function channel()
    {
        return $this->hasOne(Channel::class, 'channel_id');
    }
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner');
    }
    public function groupDetail()
    {
        return $this->hasOne(GroupDetail::class, 'group_id', 'id');
    }
}
