// import {defineSchema} from "convex/server";
// import {authTables} from "@convex-dev/auth/server";
//
// const schema = defineSchema({
//     ...authTables,
//     // Your other tables...
// });
//
// export default schema;


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