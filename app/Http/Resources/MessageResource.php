<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id'=> $this->user_id,
            'type' => $this->type,
            'text_content' => $this->text_content,
            'sendTime' => [
                's' => Carbon::parse($this->created_at)->format('s'),
                'i' => Carbon::parse($this->created_at)->format('i'),
                'h' => Carbon::parse($this->created_at)->format('H'),
                'd' => Carbon::parse($this->created_at)->format('d'),
                'w' => Carbon::parse($this->created_at)->format('w'),
                'full' => Carbon::parse($this->created_at)->format('H:i, d/m/Y'),
            ],
            'user' => new UserResource($this->user)
        ];
    }
}
