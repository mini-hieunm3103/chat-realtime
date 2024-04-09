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
            $table->bigInteger("channel_id")->unsigned();
            $table->bigInteger("user_id")->unsigned();
            $table->enum("type", ["image", "video", "audio", "document", "text"]);
            $table->text("text_content")->nullable();
            $table->bigInteger("file_id")->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');
            $table->foreign("user_id")->references("id")->on("users")->onDelete('cascade');
            $table->foreign('file_id')->references('id')->on('files')->onDelete('cascade');
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
