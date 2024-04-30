<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "file_id" => $this->id,
            "name" => $this->name,
            "path" => $this->path,
            "size" => $this->size,
            'sendTime' => [
                'full' => Carbon::parse($this->created_at)->format('H:i, d/m/Y'),
                'day' => Carbon::parse($this->created_at)->format('M d Y'),
            ],
        ];
    }
}
