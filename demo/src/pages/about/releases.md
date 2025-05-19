---
layout: ../../layouts/Base.astro
title: 'Releases'
---
* **3.0.0** - 19th May 2025
    * Add support for Astro View Transitions
    * Add MenuItemDefinition.clickHandlerType which specifies the mechanism for handling menu clicks: Either an Anchor (`<a>`) tag or using the `MenuClickProcessor` class.
    * Add settings:
        * `wideSubMenuFlexGap`
        * `wideSubMenuFontFamily`
        * `wideSubMenuFontSize`
        * `narrowSubMenuFontFamily`
        * `narrowSubMenuFontSize`
    * **Breaking**: Menu Item clicks will now be handled by Anchor tags instead of the `MenuClickProcessor` unless `MenuItemDefinition.clickHandlerType` is set to `MenuClickProcessor` or `MenuItemDefinition.url` is left undefined. This may break existing menu items used to run JavaScript.\
    Fix by setting `MenuItemDefinition.clickHandlerType` to `MenuClickProcessor`.
    * **Breaking**: Wide sub menu's flex gap were using `ExpandableItemSettings.narrowSubMenuFlexGap`.  This has been fixed to use the new `ExpandableItemSettings.wideSubMenuFlexGap`.
* **2.0.0**\
Changed CSS custom property names (refer to Styling in Using documentation)
* **1.0.0**\
Built with Astro 5
* **0.9.2**\
Built with Astro 4