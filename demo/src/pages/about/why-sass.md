---
layout: ../../layouts/Base.astro
title: 'Why Sass'
---

Many of the features previously available in SASS/SCSS are now also available in CSS.  For example [nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting).  While SASS/SCSS still has other powerful capabilities not available in CSS, I would have preferred not to include it in Main Menu.  Most of these extra capabilities are not needed and using SASS/SCSS burden developers using Main Menu with extra learning.

However there is one extra capability that is needed: Using variables within @media queries. This is currently [not supported](https://bholmes.dev/blog/alternative-to-css-variable-media-queries/) in CSS.

The query used to determine whether MainMenu is displayed in wide or narrow, is used in several places and needs to be parameterised.  So SCSS has been included to make this possible.

Note that all other CSS in Main Menu is not dependent on SCSS.