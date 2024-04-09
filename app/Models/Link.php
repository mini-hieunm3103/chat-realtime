<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;
    protected $table = "tables";
    protected $fillable = [
        "sender_id",
        "channel_id",
        "direction",
    ];
}
