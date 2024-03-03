<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        DB::table('users')->insert([
            'name' => "Administrator",
            'email' => "admin@gmail.com",
            'password' => Hash::make(11111111),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        $id = DB::table('users')->insertGetId([
            'name' => "Nguyen Minh Hieu",
            'email' => "hieunm3103@gmail.com",
            'password' => Hash::make(11111111),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('user_details')->insert([
            'user_id' => $id,
            'bio' => "I can't do it.",
            'facebook' => "https://fb.com/hieunm3103",
            'twitter' => "https://twitter.com/hieunm3103" ,
            'github' => "https://github.com/hieu313" ,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        for ($i = 0; $i < $limit; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'password' => Hash::make(11111111),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
