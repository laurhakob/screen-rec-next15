"use client";

import {useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import {VideoPlayer} from "@/components/VideoPlayer";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Id} from "../../convex/_generated/dataModel";

interface VideoCardProps {
    video: {
        _id: Id<"videos">;
        title: string;
        videoUrl: string;
        thumbnailUrl: string;
        userId: Id<"users">;
    };
}

export default function VideoCard({video}: VideoCardProps) {
    const user = useQuery(api.users.getUserById, {userId: video.userId});

    if (user === undefined) {
        return <div>Loading...</div>;
    }
    if (user === null) {
        return <div>User not found</div>;
    }

    const avatarFallback = user.name?.charAt(0).toUpperCase() || "U";

    return (
        <div className="border rounded-lg p-4">
            <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl}/>
            <div className="flex items-center gap-2 mt-2">
                <Avatar className="size-8">
                    <AvatarImage src={user.image} alt={user.name}/>
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{user.name || "Unknown"}</p>
            </div>
            <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
        </div>
    );
}