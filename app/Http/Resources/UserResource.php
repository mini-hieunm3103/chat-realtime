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
        $avatar = ($this->userDetail->avatar_id) ? new FileResource($this->userDetail->userAvatarFile): null;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'avatar' => $avatar,
            'time' => Carbon::parse($this->created_at)->format('M j o H:i'),
            'bio' => ($this->userDetail->bio) ?? null,
            'github' => $this->userDetail->github ?? null,
            'facebook' => $this->userDetail->facebook ?? null,
            'twitter' => $this->userDetail->twitter ?? null,
        ];
    }
}
