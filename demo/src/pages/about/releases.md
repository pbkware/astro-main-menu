---
layout: ../../layouts/Base.astro
title: 'Releases'
---

- **4.1.0** - 17 Jul 2026
  - Built with Astro 7.0.9 (including vite 8)

- **4.0.0** - 1st Feb 2026
  - Add prettier
  - **Breaking**: Fix use of @media queries in line with [Sass breaking change](https://sass-lang.com/documentation/breaking-changes/media-logic/) related to Sass supporting Media Queries Level 4\.
  Can no longer use Sass `or` operator in media queries. Need to use `,` as in CSS media queries.  This means that instead of using:

    ```scss
    @media screen and ((hover: none) or (width < main-menu-config.$narrow-breakpoint))
    ```

    need to use:

    ```scss
    @media screen and (hover: none), screen and (width < main-menu-config.$narrow-breakpoint)
    ```
  
- **3.0.0** - 19th May 2025
  - Add support for Astro View Transitions
  - Add MenuItemDefinition.clickHandlerType which specifies the mechanism for handling menu clicks: Either an Anchor (`<a>`) tag or using the `MenuClickProcessor` class.
  - Add settings:
    - `wideSubMenuFlexGap`
    - `wideSubMenuFontFamily`
    - `wideSubMenuFontSize`
    - `narrowSubMenuFontFamily`
    - `narrowSubMenuFontSize`
  - **Breaking**: Menu Item clicks will now be handled by Anchor tags instead of the `MenuClickProcessor` unless `MenuItemDefinition.clickHandlerType` is set to `MenuClickProcessor` or `MenuItemDefinition.url` is left undefined. This may break existing menu items used to run JavaScript.\
    Fix by setting `MenuItemDefinition.clickHandlerType` to `MenuClickProcessor`.
  - **Breaking**: Wide sub menu's flex gap were using `ExpandableItemSettings.narrowSubMenuFlexGap`. This has been fixed to use the new `ExpandableItemSettings.wideSubMenuFlexGap`.
- **2.0.0**\
  Changed CSS custom property names (refer to Styling in Using documentation)
- **1.0.0**\
  Built with Astro 5
- **0.9.2**\
  Built with Astro 4
