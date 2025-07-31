<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\User;
use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $ingredients = Ingredient::all();

        if ($users->isEmpty() || $ingredients->isEmpty()) {
            $this->command->warn("⚠️ Please seed users and ingredients first.");
            return;
        }

        $recipes = [
            [
                'title' => 'Classic Pancakes',
                'description' => 'Fluffy pancakes made from scratch.',
                'instructions' => 'Mix all ingredients. Cook on a hot griddle.',
                'prep_time_minutes' => 10,
                'cook_time_minutes' => 15,
                'servings' => 4,
                'image_url' => 'uploads/pancakes.jpg',
                'is_public' => true,
            ],
            [
                'title' => 'Simple Biscotti',
                'description' => 'Crunchy almond-flavored cookies.',
                'instructions' => 'Mix, shape, bake, slice, and bake again.',
                'prep_time_minutes' => 20,
                'cook_time_minutes' => 30,
                'servings' => 6,
                'image_url' => 'uploads/biscotti.jpg',
                'is_public' => true,
            ],
        ];

        foreach ($recipes as $recipeData) {
            $user = $users->random();
            $recipe = Recipe::create([
                ...$recipeData,
                'user_id' => $user->id,
            ]);

            // Attach 2–4 random ingredients with amounts
            $recipe->ingredients()->attach(
                $ingredients->random(rand(2, 4))->pluck('id')->mapWithKeys(fn ($id) => [
                    $id => ['amount' => rand(1, 5) . ' units']
                ])->toArray()
            );
        }
    }
}
