<?php

namespace Database\Seeders;

use App\Models\Emoji;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmojiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loveEmoji = new Emoji();
        $loveEmoji->name = 'Love';
        $loveEmoji->value = 'love';
        $loveEmoji->src = '/emoji/love.png';
        $loveEmoji->alt = '😍';
        $loveEmoji->save();

        $hahaEmoji = new Emoji();
        $hahaEmoji->name = 'Haha';
        $hahaEmoji->value = 'haha';
        $hahaEmoji->src = '/emoji/haha.png';
        $hahaEmoji->alt = '😆';
        $hahaEmoji->save();

        $wowEmoji = new Emoji();
        $wowEmoji->name = 'Wow';
        $wowEmoji->value = 'wow';
        $wowEmoji->src = '/emoji/wow.png';
        $wowEmoji->alt = '😮';
        $wowEmoji->save();

        $cryEmoji = new Emoji();
        $cryEmoji->name = 'Cry';
        $cryEmoji->value = 'cry';
        $cryEmoji->src = '/emoji/cry.png';
        $cryEmoji->alt = '😢';
        $cryEmoji->save();

        $angryEmoji = new Emoji();
        $angryEmoji->name = 'Angry';
        $angryEmoji->value = 'angry';
        $angryEmoji->src = '/emoji/angry.png';
        $angryEmoji->alt = '😠';
        $angryEmoji->save();

        $likeEmoji = new Emoji();
        $likeEmoji->name = 'Like';
        $likeEmoji->value = 'like';
        $likeEmoji->src = '/emoji/like.png';
        $likeEmoji->alt = '👍';
        $likeEmoji->save();

        $dislikeEmoji = new Emoji();
        $dislikeEmoji->name = 'Dislike';
        $dislikeEmoji->value = 'dislike';
        $dislikeEmoji->src = '/emoji/dislike.png';
        $dislikeEmoji->alt = '👎';
        $dislikeEmoji->save();
    }
}
