import { navigate } from 'astro/virtual-modules/transitions-router.js';
/** Processes menu item clicks.  Only access this class via MenuClickProcessor.get() as only a single instance can exist (singleton) */
export class MenuClickProcessor {
    constructor() {
        document.addEventListener('astro:before-swap', () => { this._expandedExpandableItemElement = undefined; }); // Ensure there is no reference to an ExpandableItem
        document.addEventListener('astro:after-swap', () => this.initialisePage());
        this.initialisePage();
    }
    /** MainMenu component root element */
    get mainMenuElement() {
        const mainMenuComponent = document.querySelector('.main-menu');
        if (mainMenuComponent === null) {
            throw new Error('MainMenu Component not found');
        }
        else {
            return mainMenuComponent;
        }
    }
    /** Hamburger component root element. Click events is used to activate and deactive main menu */
    get hamburgerElement() {
        const hamburgerElement = document.querySelector('.hamburger');
        if (hamburgerElement === null) {
            throw new Error('Hamburger Icon not found');
        }
        else {
            return hamburgerElement;
        }
    }
    /** Returns true if MenuClickProcessor handles the elements click event.  This includes root hamburger element and expand-control elements and their children nodes */
    isClickHandledEventTarget(eventTarget) {
        if (eventTarget === this.hamburgerElement) {
            return true;
        }
        else {
            // Need to check if eventTarget is .expandable-item HTML element or a child.
            // However eventTarget may be a SVG or even a SVG path.
            if (!(eventTarget instanceof Node)) {
                return false; // Can't do anything if not Node
            }
            else {
                // Find first parent that is an Element
                let eventNode = eventTarget;
                while (!(eventNode instanceof Element)) {
                    const parentNode = eventNode.parentNode;
                    if (parentNode === null) {
                        return false;
                    }
                    else {
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
    initialisePage() {
        const hamburgerElement = this.hamburgerElement;
        const mainMenuComponent = this.mainMenuElement;
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
            }
            else {
                element.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);
                const expandControlElements = new Array();
                expandControlElements.push(expandControlElement);
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
        const menuItemElementList = mainMenuComponent.querySelectorAll('div.menu-item');
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
    async awaitNavigate(url, options) {
        await navigate(url, options);
        // Can return if soft load (however following code is probably superfluous)
        this.deactivateNarrow();
        return;
    }
    ensureNotExpanded() {
        if (this._expandedExpandableItemElement !== undefined) {
            this._expandedExpandableItemElement.classList.remove(MenuClickProcessor.expandableItemExpandedClassName);
            this._expandedExpandableItemElement = undefined;
        }
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
