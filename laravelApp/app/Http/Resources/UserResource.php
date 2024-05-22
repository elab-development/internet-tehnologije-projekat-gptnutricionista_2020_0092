<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'height' => $this->height,
            'weight' => $this->weight,
            'goal_weight' => $this->goal_weight,
            'dietary_preferences' => $this->dietary_preferences,
            'food_intakes' => $this->foodIntakes,
            'water_intakes' => $this->waterIntakes,
            'personalized_trainings' => $this->personalizedTrainings,
            'role' => $this->role,

        ];
    }
}
