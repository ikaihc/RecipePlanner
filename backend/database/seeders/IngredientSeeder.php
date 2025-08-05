<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        $ingredients = [
            ['name' => 'Flour'],
            ['name' => 'Lemonade'],
            ['name' => 'Eggs'],
            ['name' => 'Butter'],
            ['name' => 'Almond'],
            ['name' => 'Salt'],
            ['name' => 'Milk'],
            ['name' => 'Vanilla Extract'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create($ingredient);
        }
    }
}
