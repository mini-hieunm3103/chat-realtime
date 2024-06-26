<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupDetail extends Model
{
    use HasFactory;
    protected $table = "group_detail";
    protected $fillable = [
        "group_id",
        "avatar_id",
        "approval",
        "join_group_via_link",
        "link",
        "send_message",
        "highlight_admin_message",
        "show_members",
    ];
    public function groupAvatarFile()
    {
        return $this->belongsTo(File::class, 'avatar_id');
    }
}
