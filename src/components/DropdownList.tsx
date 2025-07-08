"use client";

import {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown, Menu} from "lucide-react";

export const DropdownList = () => {
    const [selectedItem, setSelectedItem] = useState("Most recent");

    const options = [
        "Most recent",
        "Oldest first",
        "Most viewed",
        "Least viewed",
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 rounded-full">
                    <Menu className="size-5"/>
                    <span>{selectedItem}</span>
                    <ChevronDown className="size-5"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuItem key={option} onClick={() => setSelectedItem(option)}>
                        {option}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownList;