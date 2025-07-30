<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    // Table name if not default plural 'favorites' (optional if your table is 'favorites')
    protected $table = 'favorites';

    // Disable timestamps if you don't have updated_at column
    public $timestamps = false;

    // Fillable fields for mass assignment
    protected $fillable = [
        'user_id',
        'recipe_id',
    ];

    // Relationship: Favorite belongs to a Recipe
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    // Relationship: Favorite belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
