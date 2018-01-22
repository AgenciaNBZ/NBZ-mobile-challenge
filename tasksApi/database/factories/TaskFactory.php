<?php
// app/database/factories/TaskFactory.php
use Faker\Generator as Faker;


$factory->define(App\Task::class, function (Faker $faker) {
    $users = App\User::pluck('id')->toArray();
    $types = ['class', 'exam', 'medichal', 'home'];
    return [
        'name' => $faker->unique()->jobTitle,
        'description' => $faker->text,
        'due_date' => $faker->DateTime('2017-03-01'),
        'type' => $faker->randomElement($types),
        'user_id' => $faker->randomElement($users)
    ];
});
