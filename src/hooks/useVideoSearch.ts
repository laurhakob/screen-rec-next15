import {useState} from "react";

export const useVideoSearch = (videos: any[] | undefined) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredVideos = videos?.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return {searchQuery, setSearchQuery, filteredVideos};
};