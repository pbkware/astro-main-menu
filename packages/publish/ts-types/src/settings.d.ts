export interface MainMenuSettings extends ExpandableItemSettings, CommonHamburgerAndMainMenuSettings {
    /** font-family applied to MainMenu. @defaultValue inherit */
    mainMenuFontFamily?: string;
    /** margin applied to MainMenu. @defaultValue 0 */
    mainMenuMargin?: string;
    /** padding applied to MainMenu. @defaultValue 0 */
    mainMenuPadding?: string;
    /** font-size applied to the MainMenu when wide.  Will be inherited by wide Main MenuItem elements. @defaultValue 1.2em */
    wideMainMenuFontSize?: string;
    /** background-color applied to MainMenu when wide. @defaultValue #d0dae0 */
    wideMainMenuBackgroundColor?: string;
    /** gap applied to MainMenu when wide. @defaultValue 0.8em */
    wideMainMenuFlexGap?: string;
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
}
export interface ExpandableItemSettings extends MenuItemSettings {
    /** background-color applied to expand-control element within ExpandableItem. @defaultValue #bcc3c8 */
    expandControlBackgroundColor?: string;
    /** color applied to the not expanded Icon expand-control element within ExpandableItem. @defaultValue #bcc3c8 */
    notExpandedIconColor?: string;
    /** color applied to the expanded Icon expand-control element within ExpandableItem. @defaultValue #bcc3c8 */
    expandedIconColor?: string;
    /** font-family applied to wide SubMenu. @defaultValue inherit */
    wideSubMenuFontFamily?: string;
    /** font-size applied to the wide SubMenu.  Will be inherited by wide sub MenuItem elements. @defaultValue 90% */
    wideSubMenuFontSize?: string;
    /** background-color applied to SubMenu within ExpandableItem when wide. @defaultValue #d0dae0 */
    wideSubMenuBackgroundColor?: string;
    /** box-shadow applied to SubMenu within ExpandableItem when wide. @defaultValue 0.14em 0.14em 0.14em #2f3340 */
    wideSubMenuBoxShadow?: string;
    /** gap applied to SubMenu within ExpandableItem when wide. @defaultValue 0.18em */
    wideSubMenuFlexGap?: string;
    /** margin applied to SubMenu within ExpandableItem when wide. @defaultValue 0 */
    wideSubMenuMargin?: string;
    /** padding applied to SubMenu within ExpandableItem when wide. @defaultValue 0.2em 0.2em 0.1em 0.2em */
    wideSubMenuPadding?: string;
    /** font-family applied to narrow SubMenu. @defaultValue inherit */
    narrowSubMenuFontFamily?: string;
    /** font-size applied to the narrow SubMenu.  Will be inherited by narrow sub MenuItem elements. @defaultValue 90% */
    narrowSubMenuFontSize?: string;
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
}
export interface MenuItemSettings {
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
export interface HamburgerSettings extends CommonHamburgerAndMainMenuSettings {
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
export interface CommonHamburgerAndMainMenuSettings {
    /** font-size applied to the MainMenu element and Hamburger when narrow.  Will be inherited by narrow Main MenuItem elements. @defaultValue 1.8rem */
    narrowMainMenuFontSize?: string;
}
export declare namespace DefaultSettings {
    const wideMenuBackgroundColor = "#d0dae0";
    const mainMenuSettings: MainMenuSettings;
    const hamburgerSettings: HamburgerSettings;
}
