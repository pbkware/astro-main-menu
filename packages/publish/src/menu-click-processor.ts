import { navigate } from 'astro/virtual-modules/transitions-router.js';
import type { Options } from 'astro/virtual-modules/transitions-types.js';

declare global {
    interface Window {
        pbkware_AstroMainMenu_MenuClickProcessor: MenuClickProcessor;
    }
}

/** Processes menu item clicks.  Only access this class via MenuClickProcessor.get() as only a single instance can exist (singleton) */
export class MenuClickProcessor {
    /** Assign a handler to customise the behaviour of click events */
    dataClickEventer: MenuClickProcessor.DataClickEventer | undefined;

    private readonly _hamburgerIcon: Element;
    private readonly _mainMenuComponent: Element;
    private readonly _expandableItemElements = new Array<Element>();
    private _expandedExpandableItemElement: Element | undefined;


    constructor() {
        const hamburgerIcon = document.querySelector('.hamburger');
        if (hamburgerIcon === null) {
            throw new Error('Hamburger Icon not found');
        } else {
            this._hamburgerIcon = hamburgerIcon;
            const mainMenuComponent = document.querySelector('.main-menu');
            if (mainMenuComponent === null) {
                throw new Error('MainMenu Component not found');
            } else {
                this._mainMenuComponent = mainMenuComponent;
                hamburgerIcon.classList.remove(MenuClickProcessor.hamburgerActiveClassName);
                mainMenuComponent.classList.remove(MenuClickProcessor.mainMenuDisplayedClassName);

                hamburgerIcon.addEventListener('click', () => {
                    this.ensureNotExpanded();
                    hamburgerIcon.classList.toggle(MenuClickProcessor.hamburgerActiveClassName);
                    mainMenuComponent.classList.toggle(MenuClickProcessor.mainMenuDisplayedClassName);
                });

                const expandableItemElementList = mainMenuComponent.querySelectorAll('.expandable-item');
                expandableItemElementList.forEach((element) => {
                    const expandControlElement = element.querySelector('.expand-control');
                    if (expandControlElement === null) {
                        throw new Error(`expand-control element for "${element.innerHTML}" not found`);
                    } else {
                        this._expandableItemElements.push(element);
                        element.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);

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

                const menuItemElementList = mainMenuComponent.querySelectorAll('.menu-item');
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

    private deactivateNarrow() {
        this.ensureNotExpanded();
        this._hamburgerIcon.classList.remove(MenuClickProcessor.hamburgerActiveClassName);
        this._mainMenuComponent.classList.remove(MenuClickProcessor.mainMenuDisplayedClassName);
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
