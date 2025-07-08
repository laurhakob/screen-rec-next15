import Image from "next/image";
import {UserButton} from "@/features/auth/components/user-button";
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-2 bg-gray-50">
            <div className="flex items-center pl-16">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={180}
                        height={180}
                        className="mr-4 cursor-pointer"
                    />
                </Link>
            </div>
            <div className="flex items-center pr-16">
                <UserButton/>
            </div>
        </nav>
    );
};