<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar' => ($this->detail->avatar) ?? null,
            'email' => $this->email,
            'time' => Carbon::parse($this->created_at)->format('M j o H:i'),
            'bio' => ($this->detail->bio) ?? null,
            'github' => $this->detail->github ?? null,
            'facebook' => $this->detail->facebook ?? null,
            'twitter' => $this->detail->twitter ?? null,
            'email_verified_at' => $this->email_verified_at
        ];
    }
}
