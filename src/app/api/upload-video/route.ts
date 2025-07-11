// lav codey


// import {NextRequest, NextResponse} from "next/server";
// import {BUNNY} from "@/index";
//
// export async function POST(request: NextRequest) {
//     const formData = await request.formData();
//     const title = formData.get("title") as string;
//     const videoFile = formData.get("videoFile") as File;
//     const thumbnailFile = formData.get("thumbnailFile") as File;
//
//     // Check environment variables
//     const libraryId = process.env.BUNNY_LIBRARY_ID;
//     const streamAccessKey = process.env.BUNNY_STREAM_ACCESS_KEY;
//     if (!libraryId || !streamAccessKey) {
//         return NextResponse.json(
//             {error: "Missing Bunny configuration"},
//             {status: 500}
//         );
//     }
//
//     // Create video on Bunny
//     const createResponse = await fetch(
//         `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos`,
//         {
//             method: "POST",
//             headers: {
//                 "AccessKey": streamAccessKey,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({title}),
//         }
//     );
//     if (!createResponse.ok) {
//         return NextResponse.json(
//             {error: "Failed to create video on Bunny"},
//             {status: 500}
//         );
//     }
//     const {guid: videoId} = await createResponse.json();
//
//     // Upload video file
//     const videoUploadResponse = await fetch(
//         `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}`,
//         {
//             method: "PUT",
//             headers: {
//                 "AccessKey": streamAccessKey,
//             },
//             body: videoFile,
//         }
//     );
//     if (!videoUploadResponse.ok) {
//         return NextResponse.json(
//             {error: "Failed to upload video file"},
//             {status: 500}
//         );
//     }
//
//     // Upload thumbnail (optional)
//     let thumbnailUrl = "";
//     if (thumbnailFile) {
//         const thumbnailResponse = await fetch(
//             `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}/thumbnail`,
//             {
//                 method: "PUT",
//                 headers: {
//                     "AccessKey": streamAccessKey,
//                 },
//                 body: thumbnailFile,
//             }
//         );
//         if (thumbnailResponse.ok) {
//             // Bunny typically returns the thumbnail URL in the video object, but we can construct it
//             thumbnailUrl = `${BUNNY.CDN_URL}/${videoId}/thumbnail.jpg`;
//         }
//     }
//
//     return NextResponse.json({videoId, thumbnailUrl});
// }


// import {NextRequest, NextResponse} from "next/server";
// import {BUNNY} from "@/index";
//
// export async function POST(request: NextRequest) {
//     const formData = await request.formData();
//     const title = formData.get("title") as string;
//     const videoFile = formData.get("videoFile") as File;
//     const thumbnailFile = formData.get("thumbnailFile") as File;
//
//     const libraryId = process.env.BUNNY_LIBRARY_ID;
//     const streamAccessKey = process.env.BUNNY_STREAM_ACCESS_KEY;
//     if (!libraryId || !streamAccessKey) {
//         return NextResponse.json({error: "Missing Bunny configuration"}, {status: 500});
//     }
//
//     const createResponse = await fetch(
//         `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos`,
//         {
//             method: "POST",
//             headers: {
//                 "AccessKey": streamAccessKey,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({title}),
//         }
//     );
//     if (!createResponse.ok) {
//         return NextResponse.json({error: "Failed to create video on Bunny"}, {status: 500});
//     }
//     const {guid: videoId} = await createResponse.json();
//
//     const videoUploadResponse = await fetch(
//         `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}`,
//         {
//             method: "PUT",
//             headers: {"AccessKey": streamAccessKey},
//             body: videoFile,
//         }
//     );
//     if (!videoUploadResponse.ok) {
//         return NextResponse.json({error: "Failed to upload video file"}, {status: 500});
//     }
//
//     let thumbnailUrl = "";
//     if (thumbnailFile) {
//         const thumbnailResponse = await fetch(
//             `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}/thumbnail`,
//             {
//                 method: "PUT",
//                 headers: {"AccessKey": streamAccessKey},
//                 body: thumbnailFile,
//             }
//         );
//         if (thumbnailResponse.ok) {
//             thumbnailUrl = `${BUNNY.CDN_URL}/${videoId}/thumbnail.jpg`;
//         }
//     }
//
//     const videoUrl = `${BUNNY.CDN_URL}/${videoId}/video.mp4`; // Adjust based on your Bunny setup
//     return NextResponse.json({videoId, videoUrl, thumbnailUrl});
// }

import {NextRequest, NextResponse} from "next/server";
import {BUNNY} from "@/index";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const videoFile = formData.get("videoFile") as File;
    const thumbnailFile = formData.get("thumbnailFile") as File;

    const libraryId = process.env.BUNNY_LIBRARY_ID;
    const streamAccessKey = process.env.BUNNY_STREAM_ACCESS_KEY;
    if (!libraryId || !streamAccessKey) {
        console.error("Missing environment variables:", {libraryId, streamAccessKey});
        return NextResponse.json({error: "Missing Bunny configuration"}, {status: 500});
    }

    // Create the video on Bunny
    const createResponse = await fetch(
        `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos`,
        {
            method: "POST",
            headers: {
                "AccessKey": streamAccessKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title}),
        }
    );
    if (!createResponse.ok) {
        console.error("Failed to create video:", createResponse.status, createResponse.statusText);
        return NextResponse.json({error: "Failed to create video on Bunny"}, {status: 500});
    }
    const {guid: videoId} = await createResponse.json();

    // Upload the video file
    const videoUploadResponse = await fetch(
        `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}`,
        {
            method: "PUT",
            headers: {"AccessKey": streamAccessKey},
            body: videoFile,
        }
    );
    if (!videoUploadResponse.ok) {
        console.error("Failed to upload video:", videoUploadResponse.status, videoUploadResponse.statusText);
        return NextResponse.json({error: "Failed to upload video file"}, {status: 500});
    }

    // Hardcoded CDN hostname based on your Bunny library
    const cdnHostname = "vz-759d59b0-270.b-cdn.net"; // Replace with your actual CDN hostname
    const videoUrl = `https://${cdnHostname}/${videoId}/playlist.m3u8`;
    console.log("Generated videoUrl:", videoUrl);

    // Handle thumbnail upload (if provided)
    let thumbnailUrl = "";
    if (thumbnailFile) {
        const thumbnailResponse = await fetch(
            `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}/thumbnail`,
            {
                method: "PUT",
                headers: {"AccessKey": streamAccessKey},
                body: thumbnailFile,
            }
        );
        if (thumbnailResponse.ok) {
            thumbnailUrl = `https://${cdnHostname}/${videoId}/thumbnail.jpg`;
        }
    }

    return NextResponse.json({videoId, videoUrl, thumbnailUrl});
}