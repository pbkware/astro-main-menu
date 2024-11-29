import { navigate } from 'astro/virtual-modules/transitions-router.js';
/** Processes menu item clicks.  Only access this class via MenuClickProcessor.get() as only a single instance can exist (singleton) */
export class MenuClickProcessor {
    constructor() {
        this._expandableItemElements = new Array();
        const hamburgerIcon = document.querySelector('.hamburger');
        if (hamburgerIcon === null) {
            throw new Error('Hamburger Icon not found');
        }
        else {
            this._hamburgerIcon = hamburgerIcon;
            const mainMenuComponent = document.querySelector('.main-menu');
            if (mainMenuComponent === null) {
                throw new Error('MainMenu Component not found');
            }
            else {
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
                    }
                    else {
                        this._expandableItemElements.push(element);
                        element.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);
                        expandControlElement.addEventListener('click', () => {
                            if (this._expandedExpandableItemElement === undefined) {
                                this._expandedExpandableItemElement = element;
                                element.classList.toggle(MenuClickProcessor.expandableItemExpandedClassName);
                            }
                            else {
                                if (element === this._expandedExpandableItemElement) {
                                    element.classList.toggle(MenuClickProcessor.expandableItemExpandedClassName);
                                }
                                else {
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
                            let handled;
                            if (this.dataClickEventer === undefined) {
                                handled = false;
                            }
                            else {
                                handled = this.dataClickEventer(element, id, data, url);
                            }
                            if (!handled && url !== undefined) {
                                this.awaitNavigate(url, { history: 'push' });
                            }
                            else {
                                this.deactivateNarrow();
                            }
                        });
                    }
                });
            }
        }
    }
    async awaitNavigate(url, options) {
        await navigate(url, options); // I don't think this ever returns.  So following lines are probably superfluous
        this.deactivateNarrow();
        return;
    }
    ensureNotExpanded() {
        if (this._expandedExpandableItemElement !== undefined) {
            this._expandedExpandableItemElement.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);
            this._expandedExpandableItemElement = undefined;
        }
    }
    deactivateNarrow() {
        this.ensureNotExpanded();
        this._hamburgerIcon.classList.remove(MenuClickProcessor.hamburgerActiveClassName);
        this._mainMenuComponent.classList.remove(MenuClickProcessor.mainMenuDisplayedClassName);
    }
}
(function (MenuClickProcessor) {
    /** Class name used to specify hamburger is active */
    MenuClickProcessor.hamburgerActiveClassName = 'active';
    /** Class name used to specify Main Menu is displayed */
    MenuClickProcessor.mainMenuDisplayedClassName = 'displayed';
    /** Class name used to specify an expandable item (item with menu item and sub menu) has its sub menu expanded */
    MenuClickProcessor.expandableItemExpandedClassName = 'expanded';
    /** Get singleton instance of MenuClickProcessor. If it does not already exist, it is created. */
    function get() {
        if (window.pbkware_AstroMainMenu_MenuClickProcessor === undefined) {
            window.pbkware_AstroMainMenu_MenuClickProcessor = new MenuClickProcessor();
        }
        return window.pbkware_AstroMainMenu_MenuClickProcessor;
    }
    MenuClickProcessor.get = get;
})(MenuClickProcessor || (MenuClickProcessor = {}));
