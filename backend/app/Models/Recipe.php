<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'title',
        'ingredients',
        'instructions',
        'description',
        'prep_time_minutes',
        'cook_time_minutes',
        'servings',
        'image_url',
        'is_public',
    ];

    // Define inverse relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // relationship to Ingredient
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients')
                    ->withPivot('amount')
                    ->withTimestamps();
    }

}
