---
layout: ../../layouts/Base.astro
title: 'Installation'
---

Currently there is no Astro integration and Astro Main Menu has to be installed manually.

## Manual installation

The installation steps are:

* [Install Astro Main Menu package](#install-astro-main-menu-package)
* [Install Sass package](#install-sass-package)
* [Add _main-menu-config.scss file](#add-_main-menu-configscss-file)
* [Optionally modify Vite config](#optionally-modify-vite-config)

### Install Astro Main Menu package

Use your package manager to install ```@pbkware/astro-main-menu```.  If using NPM:

```
npm install @pbkware/astro-main-menu
```

### Install Sass package

Use your package manager to [install ```sass```](https://docs.astro.build/en/guides/styling/#sass-and-scss).  If using NPM:

```
npm install sass
```

### Add _main-menu-config.scss file

This file is required to specify the @media breakpoint between wide and narrow.  Add it with the following steps:

1. Ensure the following folder exists in your Astro project:\
```/src/styles/scss```
1. Within this folder, create a file named:\
```_main-menu-config.scss```
1. Add the following initial content into this file:
    ```scss
    // Breakpoint used in media queries to determine when to use narrow main menu
    $narrow-breakpoint: 24rem;
    ```

### Optionally modify Vite config

Not required in Astro 5 or later.

If you get a Dart Sass deprecation warning when building your project with Astro, modify ```astro.config.mjs``` with the [addition](https://vite.dev/config/shared-options#css-preprocessoroptions) of a ```vite``` property in the object passed to ```defineConfig()``` as shown below:

```js
export default defineConfig({
    ...

    // Set the vite scss api property below if the following warning is displayed:
    // Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler' // or "modern"
                }
            }
        }
    }
});
```