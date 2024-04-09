<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Channel;
use App\Models\Group;
use App\Models\GroupDetail;
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
        $this->call([
            // must run 2 class in first migrate
//            GeneralSeeder::class,
//            EmojiSeeder::class,


//            UserSeeder::class,
//            GroupSeeder::class,
            MessageSeeder::class,
        ]);

    }
}
