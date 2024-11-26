import { navigate } from 'astro/virtual-modules/transitions-router.js';
import type { Options } from 'astro/virtual-modules/transitions-types.js';

declare global {
    interface Window {
        pbkware_AstroMainMenu_MenuClickProcessor: MenuClickProcessor;
    }
}

export class MenuClickProcessor {
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
                    const upDownMenuItemClickElement = element.querySelector('.up-down-menu-item-click');
                    if (upDownMenuItemClickElement === null) {
                        throw new Error(`UpDownMenuItemClick element for "${element.innerHTML}" not found`);
                    } else {
                        this._expandableItemElements.push(element);
                        element.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);

                        upDownMenuItemClickElement.addEventListener('click', () => {

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
    export type DataClickEventer = (this: void, element: HTMLElement, id: string | undefined, data: string | undefined, url: string | undefined) => boolean; // true if handled

    export const hamburgerActiveClassName = 'active';
    export const mainMenuDisplayedClassName = 'displayed';
    export const expandableItemExpandedClassName = 'expanded';

    export function get(): MenuClickProcessor {
        if (window.pbkware_AstroMainMenu_MenuClickProcessor === undefined) {
            window.pbkware_AstroMainMenu_MenuClickProcessor = new MenuClickProcessor();
        }

        return window.pbkware_AstroMainMenu_MenuClickProcessor;
    }
}
