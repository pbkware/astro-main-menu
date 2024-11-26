export interface MainMenuSettings extends ExpandableItemSettings, CommonHamburgerAndMainMenuSettings {
    mainMenuFontFamily?: string;
    wideMainMenuFontSize?: string;
    wideMainMenuBackgroundColor?: string;
    narrowMainMenuBackgroundColor?: string;
    narrowMainMenuMaxWidth?: string;
    mainMenuMargin?: string;
    mainMenuPadding?: string;
    wideMainMenuFlexGap?: string;
    narrowMainMenuTop?: string;  // Set to 100% to place below anchor positioned element
    narrowMainMenuLeft?: string;
    narrowMainMenuRight?: string;
    narrowMainMenuFlexGap?: string;
    narrowMainMenuBoxShadow?: string;
}

export interface ExpandableItemSettings extends MenuItemSettings {
    wideSubMenuBackgroundColor?: string;
    wideSubMenuBoxShadow?: string;
    wideSubMenuMargin?: string;
    wideSubMenuPadding?: string;
    narrowMenuItemPadding?: string;
    upDownMenuItemClickBackgroundColor?: string;
    narrowSubMenuFlexGap?: string;
    narrowSubMenuMargin?: string;
    narrowSubMenuPadding?: string;
    narrowSubMenuMenuItemPadding?: string;
    narrowSubMenuBackgroundColor?: string;
}

export interface MenuItemSettings {
    menuItemTextDecoration?: string;
    menuItemColor?: string;
    menuItemMargin?: string;
    menuItemPadding?: string;
    menuItemHoverBackgroundColor?: string;
}

export interface HamburgerSettings extends CommonHamburgerAndMainMenuSettings {
    activeTop?: string;
    activeLeft?: string;
    activeRight?: string;
    width?: string;
    height?: string;
    pointer?: string;
    topLineTop?: string;

    // hamburgerTopWidth?: string; // will always be the same as hamburger width
    topLineHeight?: string;
    topLineBackgroundColor?: string;
    topLineTransition?: string;

    bottomLineBottom?: string;
    bottomLineWidth?: string;
    bottomLineHeight?: string;
    bottomLineBackgroundColor?: string;
    bottomLineTransition?: string;
}

export interface CommonHamburgerAndMainMenuSettings {
    narrowMainMenuFontSize?: string;
}

export namespace LightBlueTones {
    export const wideMenuBackgroundColor = '#d0dae0';
    const narrowMainMenuFontSize = '1.8rem';

    namespace ExpandableItemSettings {
        export const narrowSubMenuBackgroundColor = '#bcc3c8';
    }

    export const mainMenuSettings: MainMenuSettings = {
        narrowMainMenuFontSize,

        mainMenuFontFamily: 'inherit',
        wideMainMenuFontSize: '1.2rem',
        wideMainMenuBackgroundColor: 'inherit',
        narrowMainMenuBackgroundColor: '#cddee8',
        narrowMainMenuMaxWidth: '15em',
        mainMenuMargin: '0',
        mainMenuPadding: '0',
        wideMainMenuFlexGap: '0.8em',
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
