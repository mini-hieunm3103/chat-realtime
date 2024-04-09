<?php

namespace Database\Seeders;

use App\Models\Message;
use Carbon\Carbon;
use Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker\Factory::create();
        $limitMessages = 50;
        $channelId = 1;
        $maxUserId = 20;
        // seeding message -> general group
        for ($i = 0; $i <$limitMessages; $i++) {
            Message::create([
                'channel_id' => $channelId,
                'type' => "text",
                'text_content' =>  $faker->text(),
                'user_id' => rand(1,$maxUserId),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
        // seeding messages -> inbox Administrator and user's id = 2
        for ($i = 0; $i <$limitMessages; $i++) {
            Message::create([
                'channel_id' => 2,
                'type' => "text",
                'text_content' =>  $faker->text(),
                'user_id' => rand(1,2),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
