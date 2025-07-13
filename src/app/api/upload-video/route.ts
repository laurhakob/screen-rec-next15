// src/app/api/upload-video/route.ts

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

    // Poll for processing completion
    let status = 0;
    const maxRetries = 120; // e.g., 10 minutes with 5-second intervals
    let retries = 0;

    while (status !== 2 && retries < maxRetries) {
        const detailsResponse = await fetch(
            `${BUNNY.STREAM_BASE_URL}/${libraryId}/videos/${videoId}`,
            {
                method: "GET",
                headers: {"AccessKey": streamAccessKey},
            }
        );

        if (!detailsResponse.ok) {
            console.error("Failed to fetch video details:", detailsResponse.statusText);
            return NextResponse.json({error: "Failed to check video status"}, {status: 500});
        }

        const videoDetails = await detailsResponse.json();
        status = videoDetails.status;

        if (status === 2) {
            break;
        } else if (status === 3) { // Failed
            console.error("Video processing failed:", videoDetails);
            return NextResponse.json({error: "Video processing failed on Bunny"}, {status: 500});
        }

        // Wait 5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retries++;
    }

    if (status !== 2) {
        return NextResponse.json({error: "Video processing timed out"}, {status: 504});
    }

    // Hardcoded CDN hostname based on your Bunny library
    const cdnHostname = "vz-759d59b0-270.b-cdn.net"; // Replace with your actual CDN hostname
    const videoUrl = `https://${cdnHostname}/${videoId}/playlist.m3u8`;
    console.log("Generated videoUrl:", videoUrl);

    // Wait for HLS playlist to be available
    let playlistReady = false;
    const maxPlaylistRetries = 10; // e.g., 50 seconds with 5-second intervals
    let playlistRetries = 0;

    while (!playlistReady && playlistRetries < maxPlaylistRetries) {
        const playlistResponse = await fetch(videoUrl, {method: "HEAD"});

        if (playlistResponse.ok) {
            playlistReady = true;
        } else {
            console.log(`Playlist not ready yet (status: ${playlistResponse.status}), retrying...`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            playlistRetries++;
        }
    }

    if (!playlistReady) {
        return NextResponse.json({error: "HLS playlist availability timed out"}, {status: 504});
    }

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
        } else {
            console.error("Thumbnail upload failed:", thumbnailResponse.statusText);
            // Optionally, continue without thumbnail or return error
        }
    }

    return NextResponse.json({videoId, videoUrl, thumbnailUrl});
}