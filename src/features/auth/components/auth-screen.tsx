"use client";

import {useState} from "react";
import {SignInCard} from "./sign-in-card";
import {SignUpCard} from "./sign-up-card";
import {SignInFlow} from "../types";
import {Star} from "lucide-react";
import Image from "next/image";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div className="h-full flex items-center justify-between bg-[#e8a8d5]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20">
                {/* Left Section - SnapCast Info */}
                <div className="flex flex-col items-center justify-center gap-4 max-w-md ml-4 md:ml-4">
                    <h1 className="text-4xl font-bold">SnapCast</h1>
                    <div className="flex items-center justify-center gap-1">
                        {Array.from({length: 5}).map((_, index) => (
                            <Star key={index} className="text-yellow-600"/>
                        ))}
                    </div>
                    <p className="text-center text-gray-600">
                        SnapCast makes screen recording easy. From quick walkthroughs to full presentations, it’s fast,
                        smooth, and shareable in seconds.
                    </p>
                    <Image
                        src="/creator.jpeg"
                        alt="Laura"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                    <p className="text-lg font-bold">Laura</p>
                    <p className="text-sm text-gray-500">Project creator</p>
                </div>
                {/* Right Section - Auth Form and Header */}
                <div
                    className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 ml-auto mr-4 md:mr-4">
                    {/* Auth Form */}
                    <div className="md:h-auto md:w-[420px]">
                        {state === "signIn" ? (
                            <SignInCard setState={setState}/>
                        ) : (
                            <SignUpCard setState={setState}/>
                        )}
                    </div>

                    {/* Welcome Header */}
                    <div className="ml-5">
                        <h2 className="text-2xl font-bold text-gray-600 max-w-xs mb-8 mx-auto ">
                            Welcome to SnapCast!
                        </h2>

                        <p className="text-center text-gray-700">
                            Please sign in to start recording and sharing.</p>
                        <p className="text-center text-gray-700 mt-3">Join SnapCast today and
                            start creating amazing screen recordings!</p>

                    </div>

                </div>
            </div>
        </div>
    );
};