// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const canonicalHost = 'pbkware.klink.au';

export const githubHost = 'pbkware.github.io'; // Defined in Astro Config. In future get this from environmental variable
export const githubSite = `https://${githubHost}`;

// https://astro.build/config
export default defineConfig({
    site: githubSite,
    base: '/astro-main-menu/', // make sure has trailing slash
    trailingSlash: 'always',

    integrations: [mdx(),
        sitemap({
            // Change sitemap URLs to use custom host supplied to GitHub.
            serialize(item) {
                const url = new URL(item.url);
                if (url.host === githubHost) {
                    url.host = canonicalHost;
                }
                item.url = url.href;
                return item;
            }
        })
    ],

    // Set the vite scss api property below if the following warning is displayed:
    // Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
    // vite: {
    //     css: {
    //         preprocessorOptions: {
    //             scss: {
    //                 api: 'modern-compiler' // or "modern"
    //             }
    //         }
    //     }
    // }
});