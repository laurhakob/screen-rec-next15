// src/components/VideoPlayer.tsx

import Hls from "hls.js";
import {useEffect, useRef} from "react";

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer = ({src}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const retryCount = useRef(0);
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 3000; // 3 seconds

    const loadVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS Error:", event, data); // Log full details
                if (data.fatal && data.type === Hls.ErrorTypes.NETWORK_ERROR && retryCount.current < MAX_RETRIES) {
                    console.log(`Retrying in ${RETRY_DELAY / 1000} seconds (Attempt ${retryCount.current + 1}/${MAX_RETRIES})`);
                    setTimeout(() => {
                        retryCount.current += 1;
                        loadVideo();
                    }, RETRY_DELAY);
                }
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src;
        }
    };

    useEffect(() => {
        retryCount.current = 0; // Reset retries when src changes
        loadVideo();
    }, [src]);

    return <video ref={videoRef} controls className="w-full mt-2"/>;
};


// src/components/VideoPlayer.tsx
