<?php

namespace App\Http\Resources;

use App\Models\File;
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
        $message_file = ($this->message_file_id) ? new FileResource($this->file) : null;
        return [
            'message_id' => $this->id,
            'user_id'=> $this->user_id,
            'type' => ($this->is_recalled === 0) ? $this->type : null,
            'message_text' => ($this->is_recalled === 0) ? $this->message_text : null,
            'message_file' => ($this->is_recalled === 0) ? $message_file : null,
            'is_recalled' => $this->is_recalled,
            'sendTime' => [
                'full' => Carbon::parse($this->created_at)->format('H:i, d/m/Y'),
            ],
            'user' => new UserResource($this->user)
        ];
    }
}
