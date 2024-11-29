export var DefaultSettings;
(function (DefaultSettings) {
    DefaultSettings.wideMenuBackgroundColor = '#d0dae0';
    const narrowMainMenuFontSize = '1.8rem';
    let ExpandableItemSettings;
    (function (ExpandableItemSettings) {
        ExpandableItemSettings.narrowSubMenuBackgroundColor = '#bcc3c8';
        ExpandableItemSettings.notExpandedIconColor = '#586f8a';
    })(ExpandableItemSettings || (ExpandableItemSettings = {}));
    DefaultSettings.mainMenuSettings = {
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
        expandControlBackgroundColor: ExpandableItemSettings.narrowSubMenuBackgroundColor,
        notExpandedIconColor: ExpandableItemSettings.notExpandedIconColor,
        expandedIconColor: ExpandableItemSettings.notExpandedIconColor,
        wideSubMenuBackgroundColor: DefaultSettings.wideMenuBackgroundColor,
        wideSubMenuBoxShadow: '0.14em 0.14em 0.14em #2f3340',
        wideSubMenuMargin: '0',
        wideSubMenuPadding: '0.2em 0.2em 0.1em 0.2em',
        narrowMenuItemPadding: '0 0.2em 0 0.8rem',
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
    };
    let HamburgerSettings;
    (function (HamburgerSettings) {
        HamburgerSettings.topBackgroundColor = '#3a62e5';
    })(HamburgerSettings || (HamburgerSettings = {}));
    DefaultSettings.hamburgerSettings = {
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
    };
})(DefaultSettings || (DefaultSettings = {}));
