import {create} from "zustand";

interface RecordingStore {
    recordedVideo: Blob | null;
    setRecordedVideo: (video: Blob | null) => void;
}

export const useRecordingStore = create<RecordingStore>((set) => ({
    recordedVideo: null,
    setRecordedVideo: (video) => set({recordedVideo: video}),
}));