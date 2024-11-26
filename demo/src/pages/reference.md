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
    /** Title which will be displayed over a menu item when it is hovered */
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