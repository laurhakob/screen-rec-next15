// src/app/(dashboard)/upload/page.tsx
//
// "use client";
//
// import {useRef, useState} from "react";
// import {useRouter} from "next/navigation";
// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
// import {Textarea} from "@/components/ui/textarea";
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
// import {Loader2, Upload} from "lucide-react";
// import {useMutation} from "convex/react";
// import {api} from "../../../../convex/_generated/api";
//
// export default function UploadPage() {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [visibility, setVisibility] = useState<"public" | "private">("public");
//     const [videoFile, setVideoFile] = useState<File | null>(null);
//     const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const videoInputRef = useRef<HTMLInputElement>(null);
//     const thumbnailInputRef = useRef<HTMLInputElement>(null);
//     const router = useRouter();
//
//     const createVideoMutation = useMutation(api.videos.createVideo);
//
//     const handleVideoClick = () => {
//         videoInputRef.current?.click();
//     };
//
//     const handleThumbnailClick = () => {
//         thumbnailInputRef.current?.click();
//     };
//
//     const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setVideoFile(file);
//         }
//     };
//
//     const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setThumbnailFile(file);
//         }
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!videoFile) return;
//
//         setIsUploading(true);
//
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("description", description);
//         formData.append("visibility", visibility);
//         formData.append("videoFile", videoFile);
//         if (thumbnailFile) formData.append("thumbnailFile", thumbnailFile);
//
//         try {
//             const response = await fetch("/api/upload-video", {
//                 method: "POST",
//                 body: formData,
//             });
//
//             if (response.ok) {
//                 const {videoUrl, thumbnailUrl} = await response.json();
//                 await createVideoMutation({
//                     title,
//                     description,
//                     videoUrl,
//                     thumbnailUrl: thumbnailUrl || "",
//                     visibility,
//                 });
//                 console.log("Video successfully saved to Convex");
//                 router.push("/");
//             } else {
//                 console.error("Upload failed");
//                 // Optionally, set an error state here to display to the user
//             }
//         } catch (error) {
//             console.error("Failed to save video to Convex:", error);
//             // Optionally, set an error state here
//         } finally {
//             setIsUploading(false);
//         }
//     };
//
//     if (isUploading) {
//         return (
//             <div
//                 className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-100 to-gray-200">
//                 <div className="flex flex-col items-center space-y-4 animate-pulse">
//                     <Loader2 className="w-16 h-16 text-red-500 animate-spin"/>
//                     <h2 className="text-2xl font-bold text-gray-800">Uploading Your Video</h2>
//                     <p className="text-gray-600">Please wait while we process and upload your video...</p>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center p-4">
//             <h1 className="text-3xl font-bold mb-8">Upload a video</h1>
//             <form onSubmit={handleSubmit}
//                   className="w-full max-w-md space-y-6 border border-gray-300 shadow-lg rounded-xl bg-white p-6">
//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Title</label>
//                     <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter video title"/>
//                 </div>
//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Description</label>
//                     <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
//                               placeholder="Briefly describe what this video is about"/>
//                 </div>
//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Video</label>
//                     <div
//                         className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
//                         onClick={handleVideoClick}
//                     >
//                         {videoFile ? (
//                             <p className="text-sm text-gray-600">{videoFile.name}</p>
//                         ) : (
//                             <div className="flex items-center gap-2">
//                                 <Upload className="w-8 h-8 text-gray-400"/>
//                                 <p className="text-sm text-gray-600">Upload a video</p>
//                             </div>
//                         )}
//                     </div>
//                     <input
//                         type="file"
//                         accept="video/*"
//                         ref={videoInputRef}
//                         className="hidden"
//                         onChange={handleVideoChange}
//                     />
//                 </div>
//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Thumbnail</label>
//                     <div
//                         className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
//                         onClick={handleThumbnailClick}
//                     >
//                         {thumbnailFile ? (
//                             <img src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail"
//                                  className="max-h-full max-w-full object-contain"/>
//                         ) : (
//                             <div className="flex items-center gap-2">
//                                 <Upload className="w-8 h-8 text-gray-400"/>
//                                 <p className="text-sm text-gray-600">Upload a thumbnail</p>
//                             </div>
//                         )}
//                     </div>
//                     <input
//                         type="file"
//                         accept="image/jpeg,image/png"
//                         ref={thumbnailInputRef}
//                         className="hidden"
//                         onChange={handleThumbnailChange}
//                     />
//                 </div>
//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Visibility</label>
//                     <Select value={visibility} onValueChange={(value) => setVisibility(value as "public" | "private")}>
//                         <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select visibility (Public or Private)"/>
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="public">Public</SelectItem>
//                             <SelectItem value="private">Private</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <Button type="submit" className="w-full bg-red-500 text-white rounded-full hover:bg-red-500/75"
//                         disabled={isUploading}>
//                     Upload Video
//                 </Button>
//             </form>
//         </div>
//     );
// }


"use client";

import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Loader2, Upload} from "lucide-react";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {useRecordingStore} from "@/lib/recording-store";

export default function UploadPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const {recordedVideo, setRecordedVideo} = useRecordingStore();

    const createVideoMutation = useMutation(api.videos.createVideo);

    useEffect(() => {
        if (recordedVideo) {
            setVideoFile(new File([recordedVideo], "screen-recording.webm", {type: "video/webm"}));
        }
    }, [recordedVideo]);

    const handleVideoClick = () => {
        videoInputRef.current?.click();
    };

    const handleThumbnailClick = () => {
        thumbnailInputRef.current?.click();
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
            setRecordedVideo(null); // Clear recorded video if a new file is selected
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("visibility", visibility);
        formData.append("videoFile", videoFile);
        if (thumbnailFile) formData.append("thumbnailFile", thumbnailFile);

        try {
            const response = await fetch("/api/upload-video", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const {videoUrl, thumbnailUrl} = await response.json();
                await createVideoMutation({
                    title,
                    description,
                    videoUrl,
                    thumbnailUrl: thumbnailUrl || "",
                    visibility,
                });
                console.log("Video successfully saved to Convex");
                setRecordedVideo(null); // Clear recorded video after successful upload
                router.push("/");
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Failed to save video to Convex:", error);
        } finally {
            setIsUploading(false);
        }
    };

    if (isUploading) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-100 to-gray-200">
                <div className="flex flex-col items-center space-y-4 animate-pulse">
                    <Loader2 className="w-16 h-16 text-red-500 animate-spin"/>
                    <h2 className="text-2xl font-bold text-gray-800">Uploading Your Video</h2>
                    <p className="text-gray-600">Please wait while we process and upload your video...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-8">Upload a video</h1>
            <form onSubmit={handleSubmit}
                  className="w-full max-w-md space-y-6 border border-gray-300 shadow-lg rounded-xl bg-white p-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter video title"/>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
                              placeholder="Briefly describe what this video is about"/>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Video</label>
                    <div
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={handleVideoClick}
                    >
                        {videoFile ? (
                            recordedVideo ? (
                                <video
                                    src={URL.createObjectURL(recordedVideo)}
                                    className="max-h-full max-w-full object-contain"
                                    controls
                                />
                            ) : (
                                <p className="text-sm text-gray-600">{videoFile.name}</p>
                            )
                        ) : (
                            <div className="flex items-center gap-2">
                                <Upload className="w-8 h-8 text-gray-400"/>
                                <p className="text-sm text-gray-600">Upload a video</p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="video/*"
                        ref={videoInputRef}
                        className="hidden"
                        onChange={handleVideoChange}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Thumbnail</label>
                    <div
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={handleThumbnailClick}
                    >
                        {thumbnailFile ? (
                            <img src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail"
                                 className="max-h-full max-w-full object-contain"/>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Upload className="w-8 h-8 text-gray-400"/>
                                <p className="text-sm text-gray-600">Upload a thumbnail</p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        ref={thumbnailInputRef}
                        className="hidden"
                        onChange={handleThumbnailChange}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Visibility</label>
                    <Select value={visibility} onValueChange={(value) => setVisibility(value as "public" | "private")}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select visibility (Public or Private)"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full bg-red-500 text-white rounded-full hover:bg-red-500/75"
                        disabled={isUploading || !videoFile}>
                    Upload Video
                </Button>
            </form>
        </div>
    );
}