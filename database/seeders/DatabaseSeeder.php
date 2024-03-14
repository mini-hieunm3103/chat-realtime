<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use App\Models\UserDetail;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker\Factory::create();
        $limit = 5;
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
        UserDetail::create([
            'user_id' => $id1
        ]);
        $id2 = DB::table('users')->insertGetId([
            'name' => "Nguyen Minh Hieu",
            'email' => "hieunm3103@gmail.com",
            'password' => Hash::make(11111111),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('user_details')->insert([
            'user_id' => $id2,
            'bio' => "I can't do it.",
            'facebook' => "https://fb.com/hieunm3103",
            'twitter' => "https://twitter.com/hieunm3103" ,
            'github' => "https://github.com/hieu313" ,
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
            'description' => 'One For All',
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

        for ($i = 0; $i < $limit; $i++) {
            $user = User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'password' => Hash::make(11111111),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
            UserDetail::create([
                'user_id' => $user->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
            $generalChannel->users()->attach([$user->id => [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]]);
        }
        for ($i = 0; $i < $limit; $i++) {
            Message::create([
                'content' =>  $faker->text(),
                'channel_id' => 2,
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
        for ($i = 0; $i < 1; $i++) {
            Message::create([
                'content' =>  $faker->text(),
                'channel_id' => 2,
                'user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
