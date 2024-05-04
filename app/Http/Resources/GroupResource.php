<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $avatarFile = ($this->groupDetail->avatar_id) ? new FileResource($this->groupDetail->groupAvatarFile) : null;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'owner' => new UserResource(User::find($this->owner)->first()),
            'admins' => UserResource::collection($this->admins),
            'avatar' => $avatarFile,
            'approval' => $this->groupDetail->approval,
            'join_group_via_link' => $this->groupDetail->join_group_via_link,
            'send_message' => $this->groupDetail->send_message,
            'highlight_admin_message' => $this->groupDetail->highlight_admin_message,
            'show_members' => $this->groupDetail->show_members,
            'time' => Carbon::parse($this->created_at)->format('M j o H:i'),

        ];
    }
}
