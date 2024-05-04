<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $table = 'files';
    protected $fillable = [
        "name",
        "path",
        "size"
    ];

    public function message()
    {
        return $this->hasOne(Message::class, 'message_file_id', 'id');
    }
}
