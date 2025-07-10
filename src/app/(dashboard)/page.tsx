// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
// import {Search, Upload, Video} from "lucide-react";
// import {DropdownList} from "@/components/DropdownList";
// import VideoCard from "@/components/VideoCard";
//
// export default function Home() {
//     return (
//         <div className="p-16">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-sm text-gray-400">Public Library</h2>
//                 <div className="flex gap-2">
//                     <Button
//                         size="lg"
//                         className="bg-white text-black hover:bg-gray-200/50 hover:text-black/50 rounded-full"
//                     >
//                         <Upload className="size-5 mr-2"/>
//                         Upload a video
//                     </Button>
//                     <Button
//                         size="lg"
//                         className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full"
//                     >
//                         <Video className="size-5 mr-2"/>
//                         Record a video
//                     </Button>
//                 </div>
//             </div>
//             <h1 className="text-2xl">All Videos</h1>
//             <div className="flex justify-between items-center mt-4">
//                 <div className="relative w-1/2">
//                     <Input
//                         className="rounded-full border border-gray-300 pl-10 w-full"
//                         placeholder="Search for videos, tags, folders..."
//                     />
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"/>
//                 </div>
//                 <DropdownList/>
//             </div>
//             <div className="mt-8">
//                 <VideoCard/>
//             </div>
//
//         </div>
//     );
// }


import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search, Video} from "lucide-react";
import {DropdownList} from "@/components/DropdownList";
import VideoCard from "@/components/VideoCard";
import UploadButton from "@/components/UploadButton";

export default function Home() {
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
            <div className="mt-8">
                <VideoCard/>
            </div>
        </div>
    );
}