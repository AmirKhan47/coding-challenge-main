<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        $this->call(UsersSeeder::class);
//        $this->call(RequestsSeeder::class);
//        $this->call(ConnectionsInCommonSeeder::class);
        $faker = Faker::create();

//        for ($i=2;$i<=100;$i++) {
//            DB::table('users')->insert([
//                'name' => 'Amir'.$i,
//                'email' => 'amir@gmail.com'.$i,
//                'password' => bcrypt('12345678'),
//                'created_at' => now(),
//                'updated_at' => now(),
//            ]);
//        }

        for ($i=26;$i<=50;$i++) {
            DB::table('connections')->insert([
                'user_id1' => 1,
                'user_id2' => $i,
                'status' => 'sr',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        for ($i=51;$i<=75;$i++) {
            DB::table('connections')->insert([
                'user_id1' => $i,
                'user_id2' => 1,
                'status' => 'rr',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        for ($i=76;$i<=100;$i++) {
            DB::table('connections')->insert([
                'user_id1' => 1,
                'user_id2' => $i+1,
                'status' => 'c',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

//        connections in common seeder for user 1 and 2
        for ($i=26;$i<=50;$i++) {
            DB::table('connections')->insert([
                'user_id1' => 1,
                'user_id2' => $i,
                'status' => 'c',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
//        connections in common seeder for user 1 and 2
        for ($i=26;$i<=50;$i++) {
            DB::table('connections')->insert([
                'user_id1' => 2,
                'user_id2' => $i,
                'status' => 'c',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
