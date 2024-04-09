<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\UserDetail;
use Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker\Factory::create();
        $limit = 20;
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
            Channel::find(1)->users()->attach([$user->id => [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]]);
        }
    }
}
