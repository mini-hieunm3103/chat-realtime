<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Group;
use App\Models\GroupDetail;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $limit = 5;
        for ($i = 0; $i < $limit; $i++) {
            $groupName = $faker->company;
            $channel = Channel::create([
                'name' => $groupName,
                'type' => 'group',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
            $channel->users()->attach([1 => [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]]);
            $channel->users()->attach([2 => [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]]);
            $group = Group::create([
                'name' => $groupName,
                'owner' => 1,
                'channel_id' => $channel->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
            GroupDetail::create([
                'group_id' => $group->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
