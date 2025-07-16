"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Video, X} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function ScreenRecordingDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
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
                            <Dialog.Description className="text-gray-600">
                                Click record to start capturing your screen
                            </Dialog.Description>
                            <Button
                                size="lg"
                                className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white rounded-full w-full"
                            >
                                <Video className="size-5 mr-2"/>
                                Record
                            </Button>
                        </CardContent>
                    </Card>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}