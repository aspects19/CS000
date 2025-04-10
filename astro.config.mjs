import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
    site: "https://www.cs000.dev",
    output: "server",
    adapter: vercel({
        webAnalytics: {
            enabled: true
        }
    }),
    markdown: {
        shikiConfig: {
            theme: "github-dark-dimmed"
        }
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport"
    },
    experimental: {
        serverIslands: true
    },
    devToolbar: {
        enabled: false
    },
    integrations: [mdx(), tailwind(), react(), sitemap(), auth()]
});