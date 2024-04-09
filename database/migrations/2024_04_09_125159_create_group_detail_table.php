<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_detail', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('group_id')->unsigned();
            // khi tạo thì sẽ tạo 1 biến groupDetail = new GroupDetail() nhưng vẫn phải validate trươớc
            $table->bigInteger('avatar_id')->unsigned()->nullable();
            $table->boolean('approval')->default(0); // cần quản trị viên phê duyệt vào nhóm hay không
            $table->boolean("join_group_via_link")->default(1);
            $table->string("link")->nullable(); // invite friends via link
            $table->boolean("send_message")->default(1);
            // true => all members can send message
            // false => Only owner and admins can send messages
            $table->boolean("highlight_admin_message")->default(0);
            $table->boolean("show_members")->default(1);
            // when group had more than x members, (set x value in resources/js/Helper/config.jsx)
            // false: member can see owner/admins and this member
            // true: member can see all members in group
            // (admins or owner can see all members)
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign("avatar_id")->references("id")->on("files")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_detail');
    }
};
