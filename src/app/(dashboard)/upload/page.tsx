import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Upload} from "lucide-react";

export default function UploadPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-8">Upload a video</h1>
            <form
                className="w-full max-w-md space-y-6 border border-gray-300 shadow-lg rounded-xl bg-white p-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input placeholder="Enter video title"/>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <Textarea placeholder="Briefly describe what this video is about"/>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Video</label>
                    <div
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Upload className="w-8 h-8 text-gray-400"/>
                            <p className="text-sm text-gray-600">Upload a video</p>
                        </div>
                    </div>
                </div>


                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Thumbnail</label>
                    <div
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Upload className="w-8 h-8 text-gray-400"/>
                            <p className="text-sm text-gray-600">Upload a thumbnail</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Visibility</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select visibility (Public or Private)"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full bg-red-500 text-white rounded-full hover:bg-red-500/75">
                    Upload Video
                </Button>
            </form>
        </div>
    );
}