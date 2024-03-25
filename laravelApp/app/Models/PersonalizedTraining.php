<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalizedTraining extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'personalized_trainings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'training_type',
        'duration',
        'target_muscle_group',
        'instructions',
    ];

    /**
     * Get the user that the personalized training belongs to.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
