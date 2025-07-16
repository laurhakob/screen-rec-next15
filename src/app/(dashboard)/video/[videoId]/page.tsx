"use client";

import {useState} from "react";
import {useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {VideoPlayer} from "@/components/VideoPlayer";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Id} from "../../../../../convex/_generated/dataModel";
import {useParams} from "next/navigation";
import {Check, Copy, Loader} from "lucide-react";

export default function VideoDetailsPage() {
    const params = useParams();
    const videoId = params.videoId as Id<"videos">;
    const video = useQuery(api.videos.getVideoById, {videoId});
    const user = useQuery(api.users.getUserById, video ? {userId: video.userId} : "skip");
    const [copied, setCopied] = useState(false);

    if (video === undefined || user === undefined) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-6 animate-spin text-muted-foreground"/>
            </div>
        );
    }

    if (video === null || user === null) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-500">Video or user not found</p>
            </div>
        );
    }

    const avatarFallback = user.name?.charAt(0).toUpperCase() || "U";
    const videoUrl = `${window.location.origin}/video/${videoId}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(videoUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error("Failed to copy URL:", error);
        }
    };

    return (
        <div className="p-16">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{video.title}</h1>
                <button
                    onClick={handleCopy}
                    className="text-gray-500 hover:text-gray-700 transition"
                    title={copied ? "Copied!" : "Copy link"}
                >
                    {copied ? <Check className="size-5"/> : <Copy className="size-5"/>}
                </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
                <Avatar className="size-10 border border-neutral-300">
                    <AvatarImage src={user.image} alt={user.name}/>
                    <AvatarFallback className="bg-neutral-200 text-lg font-medium text-neutral-500">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-lg font-medium">{user.name || "Unknown"}</p>
                    <p className="text-sm text-gray-500">{video.description}</p>
                </div>
            </div>
            <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl}/>
        </div>
    );
}