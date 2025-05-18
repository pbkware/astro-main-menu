export var ClickHandlerType;
(function (ClickHandlerType) {
    /** Menu Item has an Anchor Tag (<a>) which handles clicks by navigating to the specified URL */
    ClickHandlerType[ClickHandlerType["AnchorTag"] = 0] = "AnchorTag";
    /** Menu Item clicks are handled by the MenuClickProcessor class which uses the id, data and url fields to determine what action to take */
    ClickHandlerType[ClickHandlerType["MenuClickProcessor"] = 1] = "MenuClickProcessor";
})(ClickHandlerType || (ClickHandlerType = {}));
