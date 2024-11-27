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

Main Menu requires that one MainMenu and one Hamburger component be included in a Astro website.  Normally they would be placed within a HTML \<nav> element however this is not required.  They can even be installed in different components/pages/layouts.

Since the Main Menu is normally included on every page, a good arrangement is to include them both in a navigation component and then include that component in a base layout.

Below is an example of using a centered Main Menu (based on the code for this website).

```ts
---
import { DefaultSettings, Hamburger, MainMenu } from '@pbkware/astro-main-menu';

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
    <Hamburger />
  </div>
</nav>

<style lang="scss" define:vars={{
  wideNavBarBackgroundColor: navBackgroundColor,
  hamburgerWidth: DefaultSettings.hamburgerSettings.width,
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

The menu items in a main menu are specified by an array of [MenuItemDefinition](../reference#menuitemdefinition)s.  This array is assigned to the ```MainMenu``` component's ```menuItemDefinitions``` attribute.

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

The [MenuClickProcessor](../reference#menuclickprocessor) singleton instance will automatically handle navigation to the ```url``` specified in the [MenuItemDefinition](../reference#menuitemdefinition) of the clicked menu item.  However it is possible to customise the behaviour of a click event.

To handle a click event differently, assign an event handler closure/function to the ```dataClickEventer``` property of the gotten processor.  This handler can have up to 4 parameters:
1. **element: HTMLElement** - The HTML element which generated the click event.
1. **id: string | undefined** - If defined, can be used to easily identify which menu item was clicked.
1. **data: string | undefined** - Contains the data specified in the corresponding [MenuItemDefinition](../reference#menuitemdefinition).
1. **url: string | undefined** - Contains the URL specified in the corresponding [MenuItemDefinition](../reference#menuitemdefinition).

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

MainMenu (and Hamburger) is displayed differently on wide and narrow devices.  In wide devices (eg desktops), MainMenu is displayed with top level menu items in a horizontal bar.  In narrow devices (eg. mobiles), it is displayed with top level menu items in a vertical bar and do not respond to hover.  Note that if a device does not support hover, then MainMenu is displayed in the same way as on a narrow device.

The following @media query is used to determine whether MainMenu and Hamburger are displayed as narrow:
```scss
@use '/src/styles/scss/main-menu-config';
@media screen and ((hover: none) or (width < main-menu-config.$narrow-breakpoint)) {
  ...
}
```

This @media query is used in several places within MainMenu and Hamburger.  It can also be used when implementing custom styling.

The width below which narrow display is used, is specified in the $narrow-breakpoint SCSS variable within the ```_main-menu-config.scss``` ([see installation](./installation#add-_main-menu-configscss-file)). This width should be wider than both the width of MainMenu bar when displayed wide and the width of general mobile devices (but not necessarily tablet devices).  It is preferable to specify the width in units of ```rem```.  (Note that it is not possible to use ```em``` units in @media queries).

## Styling

The MainMenu and Hamburger components can be styled using either their:
* [**```settings``` attribute**](#styling-using-settings-attribute) (the easy way)
* [**class attributes**](#styling-using-class-attributes) (the more powerful way)

### Styling using settings attribute

This is the easy way of styling the MainMenu and Hamburger components as you do not have to understand the HTML and CSS used internally within these components.  You also do not have to use the @media query to distinguish between wide and narrow.

Both the MainMenu and Hamburger components have a ```settings``` attribute.  These can optionally be supplied with a settings object; respectively of type [```MainMenuSettings```](../reference#mainmenusettings) and [```HamburgerSettings```](../reference#hamburgersettings).

All of the properties in these settings object are optional.  If a property is not defined, its respective CSS uses its default value.  If the settings object is not supplied, all the relevant CSS use the default values.  The ```DefaultSettings``` namespace exports setting objects with the default values:

```ts
export namespace DefaultSettings {
  export const wideMenuBackgroundColor; // can be used to set background color of containing HTML element
  export const mainMenuSettings: MainMenuSettings;
  export const hamburgerSettings: HamburgerSettings;
}
```

Below is an example of using these settings:

```ts
---
import {
  type MainMenuSettings,
  type MenuItemDefinition,
  DefaultSettings,
  Hamburger,
  MainMenu
} from '@pbkware/astro-main-menu';

export const navBackgroundColor = '#D6DAE0'; // used to style nav background color

const mainMenuSettings: MainMenuSettings = {
  wideMainMenuBackgroundColor: navBackgroundColor,
  wideSubMenuBackgroundColor: navBackgroundColor,
}

const hamburgerSettings: HamburgerSettings = {
    ...DefaultSettings.hamburgerSettings, // not really needed here as undefined settings use default values
    bottomLineBackgroundColor: 'red',
}
---

<nav>
  <MainMenu settings={mainMenuSettings} menuItemDefinitions={menuItemDefinitions} />
  <Hamburger settings={hamburgerSettings} />
</nav>
```

### Styling using class attributes

Both the MainMenu and Hamburger components can optionally be [passed styled classes](https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component) which allow the containing class to style these components.  In addition, the MainMenu can also pass styled classes through its `expandableItemClass` and `menuItemClass` attributes.  These are passed on down to the respective classes within MainMenu.

The following class names should be used:
* `main-menu` - for styling the MainMenu component
* `expandable-item` - for styling ExpandableItem components
* `menu-item` - for styling MenuItem components
* `hamburger` - for styling the Hamburger component

Note that using attributes such as `expandableItemClass` and `menuItemClass` to pass classes down to lower level contained components, is not a documented Astro feature.  It works now, and probably will in the future.  However, be aware that there is a possibility that future releases of Astro may break this capability.

The example below demonstrates how class styling can be used to put borders around MainMenu, its MenuItems and Hamburger:

```ts
<nav>
  <MainMenu
    class="main-menu"
    menuItemDefinitions={menuItemDefinitions}
    menuItemClass="menu-item"
  />
  <Hamburger class="hamburger"/>
</nav>

<style>
  .menu-item {
    border: solid green;
  }
  .main-menu {
    border: solid red;
  }
  .hamburger {
    border: solid black;
  }
</style>
```

Using classes to style MainMenu and Hamburger provides greater styling potential however you are required to understand the internals of MainMenu and/or Hamburger and quite likely use @media queries.  Also this styling will be given less emphasis in respect to backwards compatibility compared to using settings.

