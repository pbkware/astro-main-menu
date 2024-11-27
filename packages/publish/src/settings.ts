
export interface MainMenuSettings extends ExpandableItemSettings, CommonHamburgerAndMainMenuSettings {
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
    /** background-color applied to UpDownMenuItemClick element within ExpandableItem. @defaultValue #bcc3c8 */
    upDownMenuItemClickBackgroundColor?: string;
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

export interface CommonHamburgerAndMainMenuSettings {
    /** font-size applied to the MainMenu element and Hamburger when narrow.  Will be inherited by MenuItem elements. @defaultValue 1.8rem */
    narrowMainMenuFontSize?: string;
}

export namespace DefaultSettings {
    export const wideMenuBackgroundColor = '#d0dae0';
    const narrowMainMenuFontSize = '1.8rem';

    namespace ExpandableItemSettings {
        export const narrowSubMenuBackgroundColor = '#bcc3c8';
    }

    export const mainMenuSettings: MainMenuSettings = {
        narrowMainMenuFontSize,

        mainMenuFontFamily: 'inherit',
        mainMenuMargin: '0',
        mainMenuPadding: '0',
        wideMainMenuFontSize: '1.2rem',
        wideMainMenuBackgroundColor: '#d0dae0',
        wideMainMenuFlexGap: '0.8em',
        narrowMainMenuBackgroundColor: '#cddee8',
        narrowMainMenuMaxWidth: '15em',
        narrowMainMenuTop: '0',
        // narrowMainMenuLeft: '0',
        narrowMainMenuRight: '0',
        narrowMainMenuFlexGap: '0.18em',
        narrowMainMenuBoxShadow: '0 .1em .4em black',

        wideSubMenuBackgroundColor: wideMenuBackgroundColor,
        wideSubMenuBoxShadow: '0.14em 0.14em 0.14em #2f3340',
        wideSubMenuMargin: '0',
        wideSubMenuPadding: '0.2em 0.2em 0.1em 0.2em',
        narrowMenuItemPadding: '0 0.2em 0 0.8rem',
        upDownMenuItemClickBackgroundColor: ExpandableItemSettings.narrowSubMenuBackgroundColor,
        narrowSubMenuFlexGap: '0.18em',
        narrowSubMenuMargin: '-0.18rem 0 0 0',
        narrowSubMenuPadding: '0.36rem 0 0 0',
        narrowSubMenuMenuItemPadding: '0 0 0 1.8rem',
        narrowSubMenuBackgroundColor: ExpandableItemSettings.narrowSubMenuBackgroundColor,

        menuItemTextDecoration: 'none',
        menuItemColor: '#021426',
        menuItemMargin: '0',
        menuItemPadding: '0',
        menuItemHoverBackgroundColor: '#97c7e7',
    }

    namespace HamburgerSettings {
        export const topBackgroundColor = '#3a62e5';
    }

    export const hamburgerSettings: HamburgerSettings = {
        narrowMainMenuFontSize,

        activeTop: '0',
        // activeleft: '0',
        activeRight: '0',
        width: '1.8em',
        height: '0.8em',
        pointer: 'pointer',

        topLineTop: '0.1em',
        topLineHeight: '0.2em',
        topLineBackgroundColor: HamburgerSettings.topBackgroundColor,
        topLineTransition: 'all 0.3s ease-in-out',

        bottomLineBottom: '0.1em',
        bottomLineWidth: '1.4em',
        bottomLineHeight: '0.2em',
        bottomLineBackgroundColor: HamburgerSettings.topBackgroundColor,
        bottomLineTransition: 'transform 0.3s ease-in-out',
    }
}
