---
layout: ../layouts/Base.astro
title: 'Reference'
---

## MenuItemDefinition

```ts
export interface MenuItemDefinition {
    /** Text which will be displayed in a menu item. Always required */
    text: string;
    /** Url which will be navigated to if a menu item is clicked.  Note that this behaviour can be overrided by assigning a handler to MenuClickProcessor.dataClickEventer */
    url?: string;
    /** Title which will be displayed near a menu item when it is hovered */
    title?: string;
    /** Passed to MenuClickProcessor.dataClickEventer handler.  Can be used to easily identify which menu item was clicked */
    id?: string;
    /** Passed to MenuClickProcessor.dataClickEventer handler.  Can hold data specific to this menu item that is used by handler */
    data?: string;
    /** Specifies menu items in a sub menu attached to this menu item.  Note that only top level menu items can have children */
    children?: readonly MenuItemDefinition[];
}
```
## Settings

### MainMenuSettings

Note that narrow also covers devices which do not support hover (eg. Mobile and tablets not using stylus)

```ts
export interface MainMenuSettings {
    // MainMenu

    /** font-family applied to MainMenu. @defaultValue inherit */
    mainMenuFontFamily?: string;
    /** margin applied to MainMenu. @defaultValue 0 */
    mainMenuMargin?: string;
    /** padding applied to MainMenu. @defaultValue 0 */
    mainMenuPadding?: string;
    /** font-size applied to the MainMenu when wide.  Will be inherited by MenuItem elements. @defaultValue 1.2rem */
    wideMainMenuFontSize?: string;
    /** background-color applied to MainMenu when wide. @defaultValue #d0dae0 */
    wideMainMenuBackgroundColor?: string;
    /** gap applied to MainMenu when wide. @defaultValue 0.8em */
    wideMainMenuFlexGap?: string;
     /** font-size applied to the MainMenu element and Hamburger when narrow.  Will be inherited by MenuItem elements. @defaultValue 1.8rem */
    narrowMainMenuFontSize?: string;
   /** background-color applied to MainMenu when narrow. @defaultValue #cddee8 */
    narrowMainMenuBackgroundColor?: string;
    /** max-width applied to MainMenu when narrow. @defaultValue 15em */
    narrowMainMenuMaxWidth?: string;
    /** top applied to MainMenu when narrow. Set to 100% to place below anchor positioned element. @defaultValue 0 */
    narrowMainMenuTop?: string;
    /** left applied to MainMenu when narrow. @defaultValue undefined */
    narrowMainMenuLeft?: string;
    /** right applied to MainMenu when narrow. @defaultValue 0 */
    narrowMainMenuRight?: string;
    /** gap applied to MainMenu when narrow. @defaultValue 0.18em */
    narrowMainMenuFlexGap?: string;
    /** box-shadow applied to MainMenu when narrow. @defaultValue 0 .1em .4em black */
    narrowMainMenuBoxShadow?: string;

    // ExpandableItem

    /** background-color applied to expand-control element within ExpandableItem. @defaultValue #bcc3c8 */
    expandControlBackgroundColor?: string;
    /** color applied to the not expanded Icon expand-control element within ExpandableItem. @defaultValue #bcc3c8 */
    notExpandedIconColor?: string;
    /** color applied to the expanded Icon expand-control element within ExpandableItem. @defaultValue #bcc3c8 */
    expandedIconColor?: string;
    /** background-color applied to SubMenu within ExpandableItem when wide. @defaultValue #d0dae0 */
    wideSubMenuBackgroundColor?: string;
    /** box-shadow applied to SubMenu within ExpandableItem when wide. @defaultValue 0.14em 0.14em 0.14em #2f3340 */
    wideSubMenuBoxShadow?: string;
    /** margin applied to SubMenu within ExpandableItem when wide. @defaultValue 0 */
    wideSubMenuMargin?: string;
    /** padding applied to SubMenu within ExpandableItem when wide. @defaultValue 0.2em 0.2em 0.1em 0.2em */
    wideSubMenuPadding?: string;
    /** padding applied to MenuItem under ExpandableItem when narrow. Does not apply to MenuItems under SubMenu @defaultValue 0 0.2em 0 0.8rem */
    narrowMenuItemPadding?: string;
    /** gap applied to SubMenu within ExpandableItem when narrow. @defaultValue 0.18em */
    narrowSubMenuFlexGap?: string;
    /** margin applied to SubMenu within ExpandableItem when narrow. @defaultValue -0.18rem 0 0 0 */
    narrowSubMenuMargin?: string;
    /** padding applied to SubMenu within ExpandableItem when narrow. @defaultValue 0.36rem 0 0 0 */
    narrowSubMenuPadding?: string;
    /** padding applied to MenuItems within SubMenu within ExpandableItem when narrow. @defaultValue 0 0 0 1.8rem */
    narrowSubMenuMenuItemPadding?: string;
    /** background-color applied to SubMenu within ExpandableItem when narrow. @defaultValue #bcc3c8 */
    narrowSubMenuBackgroundColor?: string;

    // MenuItem

    /** text-decoration applied to MenuItem. @defaultValue none */
    menuItemTextDecoration?: string;
    /** color applied to MenuItem. @defaultValue #021426 */
    menuItemColor?: string;
    /** margin applied to MenuItem. @defaultValue 0 */
    menuItemMargin?: string;
    /** padding applied to MenuItem. @defaultValue 0 */
    menuItemPadding?: string;
    /** background-color applied to MenuItem when hovered. @defaultValue #97c7e7 */
    menuItemHoverBackgroundColor?: string;
}
```

### HamburgerSettings

```ts
export interface HamburgerSettings {
    /** font-size applied to the MainMenu element and Hamburger when narrow.  Will be inherited by MenuItem elements. @defaultValue 1.8rem */
    narrowMainMenuFontSize?: string;

    /** top applied to Hamburger when active. @defaultValue 0 */
    activeTop?: string;
    /** left applied to Hamburger when active. @defaultValue undefined */
    activeLeft?: string;
    /** right applied to Hamburger when active. @defaultValue 0 */
    activeRight?: string;
    /** width applied to Hamburger. @defaultValue 1.8em */
    width?: string;
    /** height applied to Hamburger. @defaultValue 0.8em */
    height?: string;
    /** pointer applied to Hamburger. @defaultValue pointer */
    pointer?: string;

    /** top applied to Hamburger's top line. @defaultValue 0.1em */
    topLineTop?: string;
    // topLineWidth?: string; // will always be the same as hamburger width
    /** height applied to Hamburger's top line. @defaultValue 0.2em */
    topLineHeight?: string;
    /** background-color applied to Hamburger's top line. @defaultValue #3a62e5 */
    topLineBackgroundColor?: string;
    /** transition applied to Hamburger's top line. @defaultValue all 0.3s ease-in-out */
    topLineTransition?: string;

    /** bottom applied to Hamburger's bottom line. @defaultValue 0.1em */
    bottomLineBottom?: string;
    /** width applied to Hamburger's bottom line. @defaultValue 1.4em */
    bottomLineWidth?: string;
    /** height applied to Hamburger's bottom line. @defaultValue 0.2em */
    bottomLineHeight?: string;
    /** background-color applied to Hamburger's bottom line. @defaultValue #3a62e5 */
    bottomLineBackgroundColor?: string;
    /** transition applied to Hamburger's bottom line. @defaultValue transform 0.3s ease-in-out */
    bottomLineTransition?: string;
}
```

## MenuClickProcessor

```ts
/** Processes menu item clicks.  Only access this class via MenuClickProcessor.get() as only a single instance can exist (singleton) */
export class MenuClickProcessor {
    /** Assign a handler to customise the behaviour of click events */
    dataClickEventer: MenuClickProcessor.DataClickEventer | undefined;
}

export namespace MenuClickProcessor {
    /** Get singleton instance of MenuClickProcessor. If it does not already exist, it is created. */
    export function get(): MenuClickProcessor;

    /** Class name used to specify hamburger is active */
    export const hamburgerActiveClassName = "active";
    /** Class name used to specify Main Menu is displayed */
    export const mainMenuDisplayedClassName = "displayed";
    /** Class name used to specify an expandable item (item with menu item and sub menu) has its sub menu expanded */
    export const expandableItemExpandedClassName = "expanded";

    /** Returns true if click event was handled. Otherwise event was not handled and processor will attempt to navigate to URL */
    export type DataClickEventer = (
        this: void, 
        /** The HTML element which generated the click event */
        element: HTMLElement, 
        /** The `id` value from the menu item's corresponding MenuItemDefinition. Can be used to easily identify which menu item was clicked. */
        id: string | undefined, 
        /** The `data` value from the menu item's corresponding MenuItemDefinition. Data specific to this menu item which can be used in the dataClickEventer handler. */
        data: string | undefined, 
        /** The `url` value from the menu item's corresponding MenuItemDefinition. A click on a menu item will navigate to this URL unless overridden in the dataClickEventer handler. */
        url: string | undefined
    ) => boolean;
}
```