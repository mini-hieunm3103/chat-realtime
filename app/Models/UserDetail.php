<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;
    protected $table = 'user_detail';
    protected $fillable = [
        'user_id',
        'avatar_id',
        'bio',
        'twitter',
        'facebook',
        'github',
        'last_activity',
    ];
    public function userAvatarFile()
    {
        return $this->hasOne(File::class, 'id', 'avatar_id');
    }
}
