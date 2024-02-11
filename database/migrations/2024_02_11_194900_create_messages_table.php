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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->bigInteger('sender')->unsigned();
            $table->bigInteger('receiver')->unsigned()->nullable();
            $table->bigInteger('chatroom_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('sender')->references('id')->on('users')->onDelete('cascade');;
            $table->foreign('receiver')->references('id')->on('users')->onDelete('cascade');;
            $table->foreign('chatroom_id')->references('id')->on('chatrooms')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
