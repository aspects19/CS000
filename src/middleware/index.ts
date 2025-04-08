import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";
import { sequence } from "astro:middleware";
import type { MiddlewareHandler } from "astro";

// Safer as protected routes will be protected by default
const PROTECTED_ROUTES = [
    /^\/lessons($|\/.*)/, 
];

const isProtectedRoute = (path: string) => {
    return PROTECTED_ROUTES.some((route) => route.test(path));
};

const authMiddleware: MiddlewareHandler = defineMiddleware(async (
    context, next) => {
    const session = await getSession(context.request);

    if (session?.user) {
        context.locals.user = session.user as {
            email: string;
            name: string;
            image?: string;
        };
    }

    return next();
});

const routeGuard: MiddlewareHandler = async ({ url, locals, redirect }, next) => {
    const pathName = new URL(url).pathname;

    const { user } = locals;
    
    // Skip protected route check if it's an unprotected route
    if (isProtectedRoute(pathName) && !user) {
        return redirect("/403")
    }

    

    return next();
};

export const onRequest = sequence(authMiddleware, routeGuard);
