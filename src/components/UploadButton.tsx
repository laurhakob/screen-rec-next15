"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";

export default function UploadButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/upload");
    };

    return (
        <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200/50 hover:text-black/50 rounded-full"
            onClick={handleClick}
        >
            <Upload className="size-5 mr-2"/>
            Upload a video
        </Button>
    );
}