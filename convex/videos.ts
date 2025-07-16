// import {v} from "convex/values";
// import {mutation, query} from "./_generated/server";
// import {getAuthUserId} from "@convex-dev/auth/server";
//
// export const createVideo = mutation({
//     args: {
//         title: v.string(),
//         description: v.string(),
//         videoUrl: v.string(),
//         thumbnailUrl: v.string(),
//         visibility: v.union(v.literal("public"), v.literal("private")),
//     },
//     handler: async (ctx, args) => {
//         const userId = await getAuthUserId(ctx);
//         if (!userId) {
//             throw new Error("Unauthorized");
//         }
//         await ctx.db.insert("videos", {
//             ...args,
//             userId,
//             createdAt: Date.now(),
//         });
//     },
// });
//
// export const getVideos = query({
//     args: {},
//     handler: async (ctx) => {
//         const userId = await getAuthUserId(ctx);
//         const allVideos = await ctx.db.query("videos").collect();
//         return allVideos.filter(video =>
//             video.visibility === "public" || (userId && video.userId === userId)
//         );
//     },
// });
//
// export const getCurrentUserVideos = query({
//     args: {},
//     handler: async (ctx) => {
//         const userId = await getAuthUserId(ctx);
//         if (!userId) {
//             throw new Error("Unauthorized");
//         }
//         return await ctx.db.query("videos")
//             .filter((q) => q.eq(q.field("userId"), userId))
//             .collect();
//     },
// });


// for creating detail page

import {v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {getAuthUserId} from "@convex-dev/auth/server";

export const createVideo = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        videoUrl: v.string(),
        thumbnailUrl: v.string(),
        visibility: v.union(v.literal("public"), v.literal("private")),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("Unauthorized");
        }
        await ctx.db.insert("videos", {
            ...args,
            userId,
            createdAt: Date.now(),
        });
    },
});

export const getVideos = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        const allVideos = await ctx.db.query("videos").collect();
        return allVideos.filter(video =>
            video.visibility === "public" || (userId && video.userId === userId)
        );
    },
});

export const getCurrentUserVideos = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("Unauthorized");
        }
        return await ctx.db.query("videos")
            .filter((q) => q.eq(q.field("userId"), userId))
            .collect();
    },
});

export const getVideoById = query({
    args: {videoId: v.id("videos")},
    handler: async (ctx, args) => {
        const video = await ctx.db.get(args.videoId);
        if (!video) {
            return null;
        }
        const userId = await getAuthUserId(ctx);
        if (video.visibility === "private" && (!userId || video.userId !== userId)) {
            return null;
        }
        return video;
    },
});