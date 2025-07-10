import {Id} from "../../convex/_generated/dataModel";

interface Video {
    _id: Id<"videos">;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoId: string;
    visibility: "public" | "private";
    userId: Id<"users">;
    createdAt: number;
}

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({video}: VideoCardProps) {
    return (
        <div className="border rounded-md p-4">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover"/>
            <h3 className="text-lg font-bold mt-2">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.description}</p>
        </div>
    );
}