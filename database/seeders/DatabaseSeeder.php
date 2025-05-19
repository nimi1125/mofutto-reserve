<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\UserRole;
use App\Models\PlushieStatus;
use App\Models\Course;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ユーザー権限
        DB::table('user_roles')->insert([
            ['role' => 'user', 'created_at' => now(), 'updated_at' => now()],
            ['role' => 'admin', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // ユーザー
        User::factory()->create([
            'name' => '一般ユーザー',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);

        User::factory()->create([
            'name' => '管理者ユーザー',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
        ]);

        // ぬいぐるみ状態
        DB::table('plushie_statuses')->insert([
            ['status' => '受付済', 'created_at' => now(), 'updated_at' => now()],
            ['status' => '治療中', 'created_at' => now(), 'updated_at' => now()],
            ['status' => '完了', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // コース
        DB::table('courses')->insert([
            [
                'name' => '手術コース',
                'duration_days' => 3,
                'description' => '大切なぬいぐるみが、けがをしてしまったときに。穴が空いてしまったり、綿が出てしまったり、手や耳がとれてしまった場合に、専門のスタッフがひとつひとつ丁寧に手術いたします。お帰りのときには、ふっくらと元気になった姿に。※状態により、お時間をいただくことがあります。',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '入浴コース',
                'duration_days' => 5,
                'description' => '毎日そばにいてくれたぬいぐるみに、やさしいご褒美を。表面の汚れやにおいを落とす、やさしい泡のお風呂です。生地をいたわりながら、ぬいぐるみ専用の洗浄剤でやさしく洗浄し、最後はふわふわの仕上がりに整えてお届けします。※中綿の状態によっては乾燥にお時間がかかることがあります。',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 予約可能日
        $start = Carbon::parse('2025-01-01');
        $end = Carbon::parse('2025-12-31');
        
        for ($date = $start; $date->lte($end); $date->addDay()) {
            DB::table('reservation_days')->updateOrInsert(
                ['date' => $date->toDateString()], 
                ['max_reservations' => 10]
            );
        }
    }
}
