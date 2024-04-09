<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Group;
use App\Models\GroupDetail;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class GeneralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $limitMessages = 50;
        $generalChannel = Channel::create([
            'name' => 'General',
            'type' => 'group',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $id1 = DB::table('users')->insert([
            'name' => "Administrator",
            'email' => "admin@gmail.com",
            'password' => Hash::make(11111111),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('user_detail')->insert([
            'user_id' => $id1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        $id2 = DB::table('users')->insertGetId([
            'name' => "Nguyen Minh Hieu",
            'email' => "hieunm3103@gmail.com",
            'password' => Hash::make(11111111),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('user_detail')->insert([
            'user_id' => $id2,
            'bio' => "I can't do it.",
            'facebook' => "https://fb.com/hieunm3103",
            'twitter' => "https://twitter.com/hieunm3103",
            'github' => "https://github.com/hieu313",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        // add to general group
        $generalChannel->users()->attach([$id1 => [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]]);
        $generalChannel->users()->attach([$id2 => [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]]);
        $generalGroup = Group::create([
            'name' => 'Global Chat',
            "owner" => $id2,
            'channel_id' => $generalChannel->id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        GroupDetail::create([
            'group_id' => $generalGroup->id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        $generalGroup->admins()->attach([$id1 => [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]]);
        $generalGroup->admins()->attach([$id2 => [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]]);
        // add to inbox channel
        $inboxChannel = Channel::create([
            'name' => $id1.'_'.$id2, // k phu thuoc vao ten channel. Dat ten gi cung duoc
            'type' => 'dm',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        $inboxChannel->users()->attach([$id1 => [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]]);
        $inboxChannel->users()->attach([$id2 => [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]]);
    }
}
