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
        "topic",
        "description",
        "avatar_id",
        "approval",
        "join_group_via_link",
        "link",
        "send_message",
        "highlight_admin_message",
        "show_members",
    ];
}
