import Image from "next/image";
import {UserButton} from "@/features/auth/components/user-button";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-2 bg-background">
            <div className="flex items-center pl-16">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={180}  // Increased from 100 to 120
                    height={180} // Increased from 100 to 120
                    className="mr-4" // Adds 16px margin to the right
                />
            </div>
            <div className="flex items-center pr-16">
                <UserButton/>
            </div>
        </nav>
    );
};