// "use client";
//
// import {useEffect, useRef, useState} from "react";
// import {Button} from "@/components/ui/button";
// import {Card, CardContent, CardHeader} from "@/components/ui/card";
// import {Square, Video, X} from "lucide-react";
// import * as Dialog from "@radix-ui/react-dialog";
// import {VideoPlayer} from "@/components/VideoPlayer";
//
// export default function ScreenRecordingDialog() {
//     const [open, setOpen] = useState(false);
//     const [recordingState, setRecordingState] = useState<"idle" | "recording" | "preview">("idle");
//     const [videoUrl, setVideoUrl] = useState<string | null>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const chunksRef = useRef<Blob[]>([]);
//
//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getDisplayMedia({
//                 video: true,
//                 audio: true,
//             });
//             streamRef.current = stream;
//
//             const mediaRecorder = new MediaRecorder(stream, {
//                 mimeType: "video/webm",
//             });
//             mediaRecorderRef.current = mediaRecorder;
//
//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     chunksRef.current.push(event.data);
//                 }
//             };
//
//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(chunksRef.current, {type: "video/webm"});
//                 const url = URL.createObjectURL(blob);
//                 setVideoUrl(url);
//                 setRecordingState("preview");
//                 chunksRef.current = [];
//                 stream.getTracks().forEach((track) => track.stop());
//                 streamRef.current = null;
//             };
//
//             mediaRecorder.start();
//             setRecordingState("recording");
//         } catch (error) {
//             console.error("Failed to start recording:", error);
//             setOpen(false); // Close dialog on error
//         }
//     };
//
//     const stopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//         }
//     };
//
//     useEffect(() => {
//         return () => {
//             // Cleanup on component unmount or dialog close
//             if (streamRef.current) {
//                 streamRef.current.getTracks().forEach((track) => track.stop());
//             }
//             if (videoUrl) {
//                 URL.revokeObjectURL(videoUrl);
//             }
//         };
//     }, [videoUrl]);
//
//     return (
//         <Dialog.Root open={open} onOpenChange={(newOpen) => {
//             if (!newOpen) {
//                 // Reset state when dialog closes
//                 setRecordingState("idle");
//                 setVideoUrl(null);
//                 if (streamRef.current) {
//                     streamRef.current.getTracks().forEach((track) => track.stop());
//                 }
//             }
//             setOpen(newOpen);
//         }}>
//             <Dialog.Trigger asChild>
//                 <Button
//                     size="lg"
//                     className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full"
//                 >
//                     <Video className="size-5 mr-2"/>
//                     Record a video
//                 </Button>
//             </Dialog.Trigger>
//             <Dialog.Portal>
//                 <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
//                 <Dialog.Content asChild>
//                     <Card
//                         className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6">
//                         <CardHeader className="flex flex-row items-center justify-between">
//                             <Dialog.Title className="text-2xl font-bold">Screen Recording</Dialog.Title>
//                             <Dialog.Close asChild>
//                                 <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
//                                     <X className="size-5"/>
//                                 </Button>
//                             </Dialog.Close>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             {recordingState === "idle" && (
//                                 <>
//                                     <Dialog.Description className="text-gray-600">
//                                         Click record to start capturing your screen
//                                     </Dialog.Description>
//                                     <Button
//                                         size="lg"
//                                         className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full w-full"
//                                         onClick={startRecording}
//                                     >
//                                         <Video className="size-5 mr-2"/>
//                                         Record
//                                     </Button>
//                                 </>
//                             )}
//                             {recordingState === "recording" && (
//                                 <>
//                                     <div className="flex justify-center">
//                                         <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"/>
//                                     </div>
//                                     <Dialog.Description className="text-gray-600 text-center">
//                                         Recording in progress
//                                     </Dialog.Description>
//                                     <Button
//                                         size="lg"
//                                         className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full w-full"
//                                         onClick={stopRecording}
//                                     >
//                                         <Square className="size-5 mr-2"/>
//                                         Stop Recording
//                                     </Button>
//                                 </>
//                             )}
//                             {recordingState === "preview" && videoUrl && (
//                                 <>
//                                     <VideoPlayer src={videoUrl}/>
//                                     <div className="flex gap-2">
//                                         <Button
//                                             size="lg"
//                                             variant="outline"
//                                             className="flex-1"
//                                             onClick={() => setRecordingState("idle")}
//                                         >
//                                             Record Again
//                                         </Button>
//                                         <Button
//                                             size="lg"
//                                             className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full flex-1"
//                                         >
//                                             Continue to Upload
//                                         </Button>
//                                     </div>
//                                 </>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Dialog.Content>
//             </Dialog.Portal>
//         </Dialog.Root>
//     );
// }


"use client";

import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {AlertTriangle, Square, Video, X} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function ScreenRecordingDialog() {
    const [open, setOpen] = useState(false);
    const [recordingState, setRecordingState] = useState<"idle" | "recording" | "preview" | "error">("idle");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: "video/webm",
            });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, {type: "video/webm"});
                if (blob.size === 0) {
                    setErrorMessage("Recording failed: No data captured.");
                    setRecordingState("error");
                    return;
                }
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                setRecordingState("preview");
                chunksRef.current = [];
                stream.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            };

            mediaRecorder.start();
            setRecordingState("recording");
        } catch (error) {
            console.error("Failed to start recording:", error);
            setErrorMessage("Failed to start recording. Please ensure screen sharing is allowed.");
            setRecordingState("error");
            setOpen(true); // Keep dialog open to show error
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup on component unmount or dialog close
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoUrl]);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(newOpen) => {
                if (!newOpen) {
                    // Reset state when dialog closes
                    setRecordingState("idle");
                    setVideoUrl(null);
                    setErrorMessage(null);
                    if (streamRef.current) {
                        streamRef.current.getTracks().forEach((track) => track.stop());
                    }
                }
                setOpen(newOpen);
            }}
        >
            <Dialog.Trigger asChild>
                <Button
                    size="lg"
                    className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full"
                >
                    <Video className="size-5 mr-2"/>
                    Record a video
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
                <Dialog.Content asChild>
                    <Card
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <Dialog.Title className="text-2xl font-bold">Screen Recording</Dialog.Title>
                            <Dialog.Close asChild>
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                    <X className="size-5"/>
                                </Button>
                            </Dialog.Close>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recordingState === "idle" && (
                                <>
                                    <Dialog.Description className="text-gray-600">
                                        Click record to start capturing your screen
                                    </Dialog.Description>
                                    <Button
                                        size="lg"
                                        className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full w-full"
                                        onClick={startRecording}
                                    >
                                        <Video className="size-5 mr-2"/>
                                        Record
                                    </Button>
                                </>
                            )}
                            {recordingState === "recording" && (
                                <>
                                    <div className="flex justify-center">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"/>
                                    </div>
                                    <Dialog.Description className="text-gray-600 text-center">
                                        Recording in progress
                                    </Dialog.Description>
                                    <Button
                                        size="lg"
                                        className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full w-full"
                                        onClick={stopRecording}
                                    >
                                        <Square className="size-5 mr-2"/>
                                        Stop Recording
                                    </Button>
                                </>
                            )}
                            {recordingState === "preview" && videoUrl && (
                                <>
                                    <video
                                        src={videoUrl}
                                        controls
                                        className="w-full mt-2"
                                        autoPlay={false}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => {
                                                if (videoUrl) {
                                                    URL.revokeObjectURL(videoUrl);
                                                }
                                                setVideoUrl(null);
                                                setRecordingState("idle");
                                            }}
                                        >
                                            Record Again
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full flex-1"
                                        >
                                            Continue to Upload
                                        </Button>
                                    </div>
                                </>
                            )}
                            {recordingState === "error" && (
                                <>
                                    <div className="flex items-center gap-2 text-destructive">
                                        <AlertTriangle className="size-5"/>
                                        <Dialog.Description className="text-destructive">
                                            {errorMessage}
                                        </Dialog.Description>
                                    </div>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            setErrorMessage(null);
                                            setRecordingState("idle");
                                        }}
                                    >
                                        Try Again
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}