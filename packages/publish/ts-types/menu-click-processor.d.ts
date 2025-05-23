declare global {
    interface Window {
        pbkware_AstroMainMenu_MenuClickProcessor: MenuClickProcessor;
    }
}
/** Processes menu item clicks.  Only access this class via MenuClickProcessor.get() as only a single instance can exist (singleton) */
export declare class MenuClickProcessor {
    /** Assign a handler to customise the behaviour of click events */
    dataClickEventer: MenuClickProcessor.DataClickEventer | undefined;
    private _expandedExpandableItemElement;
    constructor();
    /** MainMenu component root element */
    get mainMenuElement(): Element;
    /** Hamburger component root element. Click events is used to activate and deactive main menu */
    get hamburgerElement(): Element;
    /** Returns true if MenuClickProcessor handles the elements click event.  This includes root hamburger element and expand-control elements and their children nodes */
    isClickHandledEventTarget(eventTarget: EventTarget): boolean;
    /** Undisplays the Main Menu and deactivates the Hamburger if the Hamburger is active */
    deactivateNarrow(): void;
    private initialisePage;
    private awaitNavigate;
    private ensureNotExpanded;
}
export declare namespace MenuClickProcessor {
    /** Returns true if click event handling was completed and navigation should not be attempted. Otherwise processor will attempt to navigate to URL */
    type DataClickEventer = (this: void, 
    /** The HTML element which generated the click event */
    element: HTMLElement, 
    /** The `id` value from the menu item's corresponding MenuItemDefinition. Can be used to easily identify which menu item was clicked. */
    id: string | undefined, 
    /** The `data` value from the menu item's corresponding MenuItemDefinition. Data specific to this menu item which can be used in the dataClickEventer handler. */
    data: string | undefined, 
    /** The `url` value from the menu item's corresponding MenuItemDefinition. A click on a menu item will navigate to this URL unless overridden in the dataClickEventer handler. */
    url: string | undefined) => boolean;
    /** Class name used to specify hamburger is active */
    const hamburgerActiveClassName = "active";
    /** Class name used to specify Main Menu is displayed */
    const mainMenuDisplayedClassName = "displayed";
    /** Class name used to specify an expandable item (item with menu item and sub menu) has its sub menu expanded */
    const expandableItemExpandedClassName = "expanded";
    /** Get singleton instance of MenuClickProcessor. If it does not already exist, it is created. */
    function get(): MenuClickProcessor;
}
