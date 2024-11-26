---
layout: ../../layouts/Base.astro
title: 'Using'
---

To use the Astro Main Menu, you need to:
* [Insert](#mainmenu-and-hamburger-components) the MainMenu and Hamburger components from Astro Main Menu in your Astro website.
* [Define](#menu-items) the Menu Items to be included in the main menu.
* [Write](#menu-item-click-processor-script) menu item click processor script.
* [Specify](#widenarrow-breakpoint) the @media breakpoint to switch between wide and narrow (desktop and mobile).
* [Setup](#styling) styling for main menu and hamburger.

## MainMenu and Hamburger components

```ts
---
import { LightBlueTones, Hamburger, MainMenu } from '@pbkware/astro-main-menu';

const navBackgroundColor = '#D6DAE0';
---

<nav class="navbar">
  <div class="navbar-narrow-left">
    <span>«</span>
  </div>

  <div class="navbar-wide-left">
    <span>«</span>
  </div>

  <MainMenu menuItemDefinitions={See Menu Items section} />

  <div class="narrow-heading">
    <slot name="narrow-heading" />
  </div>

  <div class="navbar-wide-right">
    <div class="navbar-wide-right-icon">
      <span>»</span>
    </div>
    <Hamburger settings={settings} />
  </div>
</nav>

<style lang="scss" define:vars={{
  wideNavBarBackgroundColor: navBackgroundColor,
  hamburgerWidth: LightBlueTones.hamburgerSettings.width,
}}>
  @use '/src/styles/scss/main-menu-config'; // Sass is only used to to allow media breakpoint to be specified by a variable.  Otherwise rest of style is plain CSS.

  .navbar {
    width: 100%;
    background-color: var(--wideNavBarBackgroundColor, #d0dae0);
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .narrow-heading {
      display: none;
    }

    > .navbar-narrow-left {
      width: var(--hamburgerWidth, 1.8em);
      display: none;
    }

    > .navbar-wide-left {
      display: flex;
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
```


## Menu Items

The menu items in a main menu are specified by an array of [MenuItemDefinition](../reference#menu-item-definition)s.  This array is assigned to the ```MainMenu``` component's ```menuItemDefinitions``` attribute.

Menu items can have child menu items using the definition's ```children``` property but there can only be one level of children.  That is, only top level menu item definitions can have children; they cannot have grand children.

Menu item definitions always need to specify the text a menu item will display.  They can optionally include a title which will be displayed if the menu item is hovered over.  A URL can be specified which will be navigated to if the menu item is clicked (unless the click behaviour is [customised](#menu-item-click-processor-script)).  To support custom click behaviour, a menu item can include id and data properties.

To use MenuItemDefinition in a component, import it in frontmatter with:
```ts
import { type MenuItemDefinition } from '@pbkware/astro-main-menu';
```

The code below shows the MenuItemDefinition array for this demo website and how it can be assigned to the ```MainMenu```'s  ```menuItemDefinitions``` attribute.

```ts
---
import { type MenuItemDefinition, Hamburger, MainMenu } from '@pbkware/astro-main-menu';

const menuItemDefinitions: MenuItemDefinition[] = [
  {
    text: 'Start',
    url: '/',
    children: [
      {
        text: 'Home',
        url: '/',
      },
      {
        text: 'Installation',
        url: '/start/installation',
      },
      {
        text: 'Quick',
        url: '/start/quick',
      },
      {
        text: 'Using',
        url: '/start/using',
      },
    ]
  },
  {
    text: 'Reference',
    url: '/reference',
  },
  {
    text: 'Other',
    url: '/other',
    children: [
      {
        text: 'Run JavaScript',
        title: 'Demonstrates using a menu item to run a TypeScript function',
        id: 'alert',
        data: 'Menu item ran JavaScript/TypeScript which displayed this alert',
      },
      {
        text: 'Why SASS',
        url: '/other/why-sass',
      },
    ]
  },
  {
    text: 'About',
    url: '/about',
  },
];
---

<nav>
  <MainMenu menuItemDefinitions={menuItemDefinitions} />
</nav>
```
## Menu Item click processor script

Client side, it is necessary to process clicks on menu items.  To do this, include a script somewhere in your project which gets the singleton instance of the ```MenuClickProcessor``` class.  This ensures this singleton instance has been created.

```ts
<script>
  import { MenuClickProcessor } from '@pbkware/astro-main-menu';
  MenuClickProcessor.get(); // Ensures the processor has been created
</script>
```

The MenuClickProcessor singleton instance will automatically handle navigation to the ```url``` specified in the [MenuItemDefinition](../reference#menu-item-definition) of the clicked menu item.  However it is possible to customise the behaviour of a click event.

To handle a click event differently, assign an event handler closure/function to the ```dataClickEventer``` property of the gotten processor.  This handler can have up to 4 parameters:
1. **element: HTMLElement** - The HTML element which generated the click event.
1. **id: string | undefined** - If defined, can be used to easily identify which menu item was clicked.
1. **data: string | undefined** - Contains the data specified in the corresponding [MenuItemDefinition](../reference#menu-item-definition).
1. **url: string | undefined** - Contains the URL specified in the corresponding [MenuItemDefinition](../reference#menu-item-definition).

The event handler should return a boolean indicating whether it handled the click event:
* **false** - The event was not handled and the processor should navigate to the page specified by the URL specified in the corresponding MenuItemDefinition.
* **true** - The event was handled and the processor will not handle it any further other than deactivating the menu.

```ts
<script>
  import { MenuClickProcessor } from '@pbkware/astro-main-menu';
  const processor = MenuClickProcessor.get(); // This always needs to be called however only need processor if want to handle dataClick event

  // Handle dataClick event.  
  processor.dataClickEventer = (element, id, data, url) => {
    if (id === 'alert') {
      setTimeout(() => alert(data), 0);
      return true; // Indicate event was handled.
    } else {
      return false; // Indicate event not handled.  processor will then try and navigate to URL
    }
  }
</script>
```
## Wide/Narrow breakpoint
## Styling
### Settings
### Classes