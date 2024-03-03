<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;
    protected $fillable = [
        'type'
    ];
    public function users() {
        return $this->belongsToMany('App\User', 'user_channel');
    }
    // get channel messages
    public function messages()
    {
        return $this->hasMany(Messages::class);
    }
}
