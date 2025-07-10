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
        return await ctx.db.query("videos").collect();
    },
});