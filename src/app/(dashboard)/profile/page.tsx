// "use client";
//
// import {useCurrentUser} from "@/features/auth/api/use-current-user";
// import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
// import {Loader, Search, Video} from "lucide-react";
// import {DropdownList} from "@/components/DropdownList";
// import {useQuery} from "convex/react";
// import {api} from "../../../../convex/_generated/api";
// import VideoCard from "@/components/VideoCard";
// import UploadButton from "@/components/UploadButton";
// import {useVideoSearch} from "@/hooks/useVideoSearch";
//
// export default function ProfilePage() {
//     const {data: user, isLoading} = useCurrentUser();
//     const videos = useQuery(api.videos.getCurrentUserVideos);
//     const {searchQuery, setSearchQuery, filteredVideos} = useVideoSearch(videos);
//
//     if (isLoading) {
//         return <Loader className="size-4 animate-spin text-muted-foreground"/>;
//     }
//
//     if (!user) {
//         return null;
//     }
//
//     const {image, email, name} = user;
//     const avatarFallback = name?.charAt(0).toUpperCase() || "U";
//
//     return (
//         <div className="p-16">
//             <div className="flex items-center gap-4 mb-4">
//                 <Avatar className="size-16 border border-neutral-300">
//                     <AvatarImage src={image} alt={name}/>
//                     <AvatarFallback className="bg-neutral-200 text-2xl font-medium text-neutral-500">
//                         {avatarFallback}
//                     </AvatarFallback>
//                 </Avatar>
//                 <div>
//                     <p className="text-sm text-gray-500">{email}</p>
//                     <p className="text-lg font-bold">{name || "User"}</p>
//                 </div>
//             </div>
//             <div className="flex gap-2 mb-4">
//                 <UploadButton/>
//                 <Button
//                     size="lg"
//                     className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full"
//                 >
//                     <Video className="size-5 mr-2"/>
//                     Record a video
//                 </Button>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//                 <div className="relative w-1/2">
//                     <Input
//                         className="rounded-full border border-gray-300 pl-10 w-full"
//                         placeholder="Search for videos, tags, folders..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"/>
//                 </div>
//                 <DropdownList/>
//             </div>
//             <div className="mt-8">
//                 <h2 className="text-xl font-bold mb-4">My Videos</h2>
//                 {videos === undefined ? (
//                     <p>Loading videos...</p>
//                 ) : filteredVideos.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {filteredVideos.map((video) => <VideoCard key={video._id} video={video}/>)}
//                     </div>
//                 ) : searchQuery ? (
//                     <p>No videos match your search.</p>
//                 ) : (
//                     <p>No videos uploaded yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }


"use client";

import {useCurrentUser} from "@/features/auth/api/use-current-user";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {Loader, Search} from "lucide-react";
import {DropdownList} from "@/components/DropdownList";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import VideoCard from "@/components/VideoCard";
import UploadButton from "@/components/UploadButton";
import {useVideoSearch} from "@/hooks/useVideoSearch";
import ScreenRecordingDialog from "@/components/ScreenRecordingDialog";

export default function ProfilePage() {
    const {data: user, isLoading} = useCurrentUser();
    const videos = useQuery(api.videos.getCurrentUserVideos);
    const {searchQuery, setSearchQuery, filteredVideos} = useVideoSearch(videos);

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground"/>;
    }

    if (!user) {
        return null;
    }

    const {image, email, name} = user;
    const avatarFallback = name?.charAt(0).toUpperCase() || "U";

    return (
        <div className="p-16">
            <div className="flex items-center gap-4 mb-4">
                <Avatar className="size-16 border border-neutral-300">
                    <AvatarImage src={image} alt={name}/>
                    <AvatarFallback className="bg-neutral-200 text-2xl font-medium text-neutral-500">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm text-gray-500">{email}</p>
                    <p className="text-lg font-bold">{name || "User"}</p>
                </div>
            </div>
            <div className="flex gap-2 mb-4">
                <UploadButton/>
                <ScreenRecordingDialog/>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="relative w-1/2">
                    <Input
                        className="rounded-full border border-gray-300 pl-10 w-full"
                        placeholder="Search for videos, tags, folders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"/>
                </div>
                <DropdownList/>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">My Videos</h2>
                {videos === undefined ? (
                    <p>Loading videos...</p>
                ) : filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video._id} video={video}/>
                        ))}
                    </div>
                ) : searchQuery ? (
                    <p>No videos match your search.</p>
                ) : (
                    <p>No videos uploaded yet.</p>
                )}
            </div>
        </div>
    );
}