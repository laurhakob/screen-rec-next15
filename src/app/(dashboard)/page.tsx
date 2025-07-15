// src/app/(dashboard)/page.tsx

"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search, Video} from "lucide-react";
import {DropdownList} from "@/components/DropdownList";
import UploadButton from "@/components/UploadButton";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {VideoPlayer} from "@/components/VideoPlayer";

export default function Home() {
    const videos = useQuery(api.videos.getVideos);

    return (
        <div className="p-16">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm text-gray-400">Public Library</h2>
                <div className="flex gap-2">
                    <UploadButton/>
                    <Button
                        size="lg"
                        className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full"
                    >
                        <Video className="size-5 mr-2"/>
                        Record a video
                    </Button>
                </div>
            </div>
            <h1 className="text-2xl">All Videos</h1>
            <div className="flex justify-between items-center mt-4">
                <div className="relative w-1/2">
                    <Input
                        className="rounded-full border border-gray-300 pl-10 w-full"
                        placeholder="Search for videos, tags, folders..."
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"/>
                </div>
                <DropdownList/>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos === undefined ? (
                    <p>Loading videos...</p>
                ) : videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video._id} className="border rounded-lg p-4">
                            <h3 className="text-lg font-semibold">{video.title}</h3>
                            <p className="text-sm text-gray-600">{video.description}</p>
                            {video.thumbnailUrl && (
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    className="w-full h-40 object-cover mt-2 rounded"
                                    onError={(e) => console.error("Thumbnail load failed:", video.thumbnailUrl, e)}
                                />
                            )}
                            <VideoPlayer src={video.videoUrl}/>
                        </div>
                    ))
                ) : (
                    <p>No videos found.</p>
                )}
            </div>
        </div>
    );
}


// src/app/(dashboard)/page.tsx
