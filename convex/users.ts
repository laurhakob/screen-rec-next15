// import {query} from "./_generated/server";
// import {getAuthUserId} from "@convex-dev/auth/server";
//
// export const current = query({
//     args: {},
//     handler: async (ctx) => {
//         const userId = await getAuthUserId(ctx);
//
//         if (userId === null) {
//             return null;
//         }
//         return await ctx.db.get(userId);
//     },
// });
//
//

import {query} from "./_generated/server";
import {v} from "convex/values";
import {getAuthUserId} from "@convex-dev/auth/server";

export const getUserById = query({
    args: {userId: v.id("users")},
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});

export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null;
        }
        return await ctx.db.get(userId);
    },
});