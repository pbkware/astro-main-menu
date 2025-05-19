---
layout: ../../layouts/Base.astro
title: 'Quick start'
---

This tutorial will step you through creating an Astro website with a main menu similar to this demo website.

Steps:
1. [Create a new Astro project](#step-1-create-a-new-astro-project)
1. [Install Astro Main Menu](#step-2-install-astro-main-menu)
1. [Configure wide/narrow breakpoint](#step-3-configure-widenarrow-breakpoint)
1. [Create NavBar component](#step-4-create-navbar-component)
1. [Create Base Layout](#step-5-create-base-layout)
1. [Create index (home) page](#step-6-create-index-home-page)
1. [Create pages: side, left, right and about](#step-7-create-pages-side-left-right-and-about)
1. [Test](#step-8-test)

## Step 1: Create a new Astro project

Ensure the required [prerequisites](https://docs.astro.build/en/install-and-setup/#prerequisites) are installed.

Create a new empty Astro project which supports TypeScript.  Make sure dependencies are installed.

```shell
npm create astro@latest
```

## Step 2: Install Astro Main Menu

Change directory into the folder created for the new Astro project and follow the [installation instructions](../installation/).

## Step 3: Configure wide/narrow breakpoint

In the `_main-menu-config.scss` file, set the `$narrow-breakpoint` variable to `18rem`.

```scss
$narrow-breakpoint: 18rem;
```

## Step 4: Create NavBar component

Ensure the folder `/src/components` exists and create a file within it called `NavBar.astro`.

Insert the following into `NavBar.astro`

```ts
---
import { type MainMenuSettings, type MenuItemDefinition, DefaultSettings, Hamburger, MainMenu } from '@pbkware/astro-main-menu';

export const navBackgroundColor = '#D6DAE0';

const mainMenuSettings: MainMenuSettings = {
    wideMainMenuBackgroundColor: navBackgroundColor,
    wideSubMenuBackgroundColor: navBackgroundColor,
}

const menuItemDefinitions: MenuItemDefinition[] = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Nature',
        url: '/nature',
        children: [
            {
                text: 'Fauna',
                url: '/fauna',
            },
            {
                text: 'Flora',
                url: '/flora',
            },
        ]
    },
    {
        text: 'About',
        url: 'about',
    },
];
---

<nav class="navbar">
    <a class="navbar-narrow-left">
        «
    </a>

    <a class="navbar-wide-left">
        «
    </a>

    <MainMenu settings={mainMenuSettings} menuItemDefinitions={menuItemDefinitions} />

    <div class="narrow-heading">
        <slot name="narrow-heading" />
    </div>

    <div class="navbar-wide-right">
        <div class="navbar-wide-right-icon">
            »
        </div>
        <Hamburger />
    </div>
</nav>

<style lang="scss" define:vars={{
    wideNavBarBackgroundColor: navBackgroundColor,
    hamburgerWidth: DefaultSettings.hamburgerSettings.width,
}}>
    @use '/src/styles/scss/main-menu-config';

    .navbar {
        width: 100%;
        background-color: var(--wideNavBarBackgroundColor);
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .narrow-heading {
            display: none;
        }

        > .navbar-narrow-left {
            display: none;
            color: black;
            width: var(--hamburgerWidth, 1.8em);
        }

        > .navbar-wide-left {
            display: flex;
            color: black;
            align-items: center;
            flex: 0 0 auto;
        }

        > .navbar-wide-right {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
        }

        @media screen and ((hover: none) or (width < main-menu-config.$narrow-breakpoint)) {
            > .narrow-heading {
                display: flex;
                align-items: center;
                font-size: small;
            }

            > .navbar-narrow-left {
                display: flex;
                align-items: center;
            }

            > .navbar-wide-left {
                display: none;
            }

            > .navbar-wide-right {
                width: var(--hamburgerWidth, 1.8em);

                > .navbar-wide-right-icon {
                    display: none;
                }
            }
        }
    }
</style>

<script>
    import { MenuClickProcessor } from '@pbkware/astro-main-menu';
    const processor = MenuClickProcessor.get(); // Create/get singleton

    // Hide narrow menu and hamburger if document is clicked outside menu
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target === null || !processor.isClickHandledEventTarget(target)) {
            processor.deactivateNarrow();
        }
    });
</script>
```

## Step 5: Create Base Layout

Ensure the folder `/src/layouts` exists and create a file within it called `Base.astro`.

Insert the following into `Base.astro`

```ts
---
import NavBar from '../components/NavBar.astro';
---

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
        <title>Quick Astro Main Menu Demo</title>
    </head>

    <body>
        <NavBar />

        <div id="content">
            <slot />
        </div>
    </body>
</html>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0 auto;
        padding: 0;
        font-size: calc(15px + 0.390625vw);
    }

    #content {
        width: 100%;
        max-width: 80ch;
        margin: 0 auto;
        padding: 0 1rem;
        line-height: 1.5;
    }
</style>
```

## Step 6: Create index (home) page

1. Ensure the folder `/src/pages` exists.
1. Delete file `/src/pages/index.astro` if it exists.
1. Under folder `/src/pages`, create a file `index.md`.
1. Insert the following into `index.md`:

```ts
---
layout: ../layouts/Base.astro
title: 'Home'
---

# Home
```

## Step 7: Create pages: nature, fauna, flora and about

Make 4 copies of the `index.md` file in the `/src/pages` folder and name them:

1. `nature.md`
1. `fauna.md`
1. `flora.md`
1. `about.md`

Open each of these new files and replace the word `Home` with the respective file name.

For example, the contents of `nature.md` should be:

```ts
---
layout: ../layouts/Base.astro
title: 'Nature'
---

# Nature
```

## Step 8: Test

Run script `npm run dev` and test with browser.