import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";
import {authTables} from "@convex-dev/auth/server";

const schema = defineSchema({
    ...authTables,
    videos: defineTable({
        title: v.string(),
        description: v.string(),
        videoUrl: v.string(),
        thumbnailUrl: v.string(),
        visibility: v.union(v.literal("public"), v.literal("private")),
        userId: v.id("users"),
        createdAt: v.number(),
    }),
});

export default schema;


// convex/schema.ts
