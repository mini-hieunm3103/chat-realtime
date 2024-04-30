<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;
    protected $table = "links";
    protected $fillable = [
        "message_id",
        'text',
        "direction",
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
