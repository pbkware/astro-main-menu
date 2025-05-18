import { navigate } from 'astro/virtual-modules/transitions-router.js';
import type { Options } from 'astro/virtual-modules/transitions-types.js';

declare global {
    interface Window {
        pbkware_AstroMainMenu_MenuClickProcessor: MenuClickProcessor;
    }
}

/** Processes menu item clicks.  Only access this class via MenuClickProcessor.get() as only a single instance can exist (singleton) */
export class MenuClickProcessor {
    /** MainMenu component root element */
    readonly mainMenuElement: Element;
    /** Hamburger component root element. Click events is used to activate and deactive main menu */
    readonly hamburgerElement: Element;

    /** Assign a handler to customise the behaviour of click events */
    dataClickEventer: MenuClickProcessor.DataClickEventer | undefined;

    private readonly _expandControlElements = new Array<Element>();
    private _expandedExpandableItemElement: Element | undefined;

    constructor() {
        const hamburgerElement = document.querySelector('.hamburger');
        if (hamburgerElement === null) {
            throw new Error('Hamburger Icon not found');
        } else {
            this.hamburgerElement = hamburgerElement;
            const mainMenuComponent = document.querySelector('.main-menu');
            if (mainMenuComponent === null) {
                throw new Error('MainMenu Component not found');
            } else {
                this.mainMenuElement = mainMenuComponent;
                hamburgerElement.classList.remove(MenuClickProcessor.hamburgerActiveClassName);
                mainMenuComponent.classList.remove(MenuClickProcessor.mainMenuDisplayedClassName);

                hamburgerElement.addEventListener('click', () => {
                    this.ensureNotExpanded();
                    hamburgerElement.classList.toggle(MenuClickProcessor.hamburgerActiveClassName);
                    mainMenuComponent.classList.toggle(MenuClickProcessor.mainMenuDisplayedClassName);
                });

                const expandableItemElementList = mainMenuComponent.querySelectorAll('.expandable-item');
                expandableItemElementList.forEach((element) => {
                    const expandControlElement = element.querySelector('.expand-control');
                    if (expandControlElement === null) {
                        throw new Error(`expand-control element for "${element.innerHTML}" not found`);
                    } else {
                        element.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);

                        this._expandControlElements.push(expandControlElement);
                        expandControlElement.addEventListener('click', () => {

                            if (this._expandedExpandableItemElement === undefined) {
                                this._expandedExpandableItemElement = element;
                                element.classList.toggle(MenuClickProcessor.expandableItemExpandedClassName);
                            } else {
                                if (element === this._expandedExpandableItemElement) {
                                    element.classList.toggle(MenuClickProcessor.expandableItemExpandedClassName);
                                } else {
                                    this._expandedExpandableItemElement.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);
                                    this._expandedExpandableItemElement = element;
                                    element.classList.add(MenuClickProcessor.expandableItemExpandedClassName);
                                }
                            }
                        });
                    }
                });

                const menuItemElementList = mainMenuComponent.querySelectorAll('div.menu-item');
                menuItemElementList.forEach((element) => {
                    if (element instanceof HTMLElement) {
                        element.addEventListener('click', () => {
                            const dataset = element.dataset;
                            const id = dataset.id;
                            const data = dataset.data;
                            const url = dataset.url;

                            let handled: boolean;
                            if (this.dataClickEventer === undefined) {
                                handled = false;
                            } else {
                                handled = this.dataClickEventer(element, id, data, url);
                            }

                            if (!handled && url !== undefined) {
                                this.awaitNavigate(url, { history: 'push' } );
                            } else {
                                this.deactivateNarrow();
                            }
                        });
                    }
                });
            }
        }
    }

    /** Returns true if MenuClickProcessor handles the elements click event.  This includes root hamburger element and expand-control elements and their children nodes */
    isClickHandledEventTarget(eventTarget: EventTarget) {
        if (eventTarget === this.hamburgerElement) {
            return true;
        } else {
            // Need to check if eventTarget is .expandable-item HTML element or a child.
            // However eventTarget may be a SVG or even a SVG path.
            if (!(eventTarget instanceof Node)) {
                return false; // Can't do anything if not Node
            } else {
                // Find first parent that is an Element
                let eventNode = eventTarget;
                while (!(eventNode instanceof Element)) {
                    const parentNode = eventNode.parentNode;
                    if (parentNode === null) {
                        return false;
                    } else {
                        eventNode = parentNode;
                    }
                }

                // Check if element is or is below an expandable-item HTMLElement
                const expandableItemElement = eventNode.closest('.main-menu > .expandable-item');
                return expandableItemElement !== null;
            }
        }
    }

    /** Undisplays the Main Menu and deactivates the Hamburger if the Hamburger is active */
    deactivateNarrow() {
        if (this.hamburgerElement.classList.contains(MenuClickProcessor.hamburgerActiveClassName)) {
            this.ensureNotExpanded();
            this.hamburgerElement.classList.remove(MenuClickProcessor.hamburgerActiveClassName);
            this.mainMenuElement.classList.remove(MenuClickProcessor.mainMenuDisplayedClassName);
        }
    }

    private async awaitNavigate(url: string, options: Options) {
        await navigate(url, options); // I don't think this ever returns.  So following lines are probably superfluous
        this.deactivateNarrow();
        return;
    }

    private ensureNotExpanded() {
        if (this._expandedExpandableItemElement !== undefined) {
            this._expandedExpandableItemElement.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);
            this._expandedExpandableItemElement = undefined;
        }
    }
}

export namespace MenuClickProcessor {
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
    ) => boolean; // true if handled

    /** Class name used to specify hamburger is active */
    export const hamburgerActiveClassName = 'active';
    /** Class name used to specify Main Menu is displayed */
    export const mainMenuDisplayedClassName = 'displayed';
    /** Class name used to specify an expandable item (item with menu item and sub menu) has its sub menu expanded */
    export const expandableItemExpandedClassName = 'expanded';

    /** Get singleton instance of MenuClickProcessor. If it does not already exist, it is created. */
    export function get(): MenuClickProcessor {
        if (window.pbkware_AstroMainMenu_MenuClickProcessor === undefined) {
            window.pbkware_AstroMainMenu_MenuClickProcessor = new MenuClickProcessor();
        }

        return window.pbkware_AstroMainMenu_MenuClickProcessor;
    }
}
