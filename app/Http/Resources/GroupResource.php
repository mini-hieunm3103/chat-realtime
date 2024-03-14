<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'owner' => $this->owner,
            'topic' => $this->topic,
            'description' => $this->description,
            'approval' => ($this->approval),
            'time' => Carbon::parse($this->created_at)->format('M j o H:i'),
            'admins' => UserResource::collection($this->admins)
        ];
    }
}
