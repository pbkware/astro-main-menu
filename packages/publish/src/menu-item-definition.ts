export interface MenuItemDefinition {
    /** Text which will be displayed in a menu item. Always required */
    text: string;
    /** Url which will be navigated to if a menu item is clicked.  Note that if  clickHandlerType is MenuClickProcessor, then this behaviour can be overrided by assigning a handler to MenuClickProcessor.dataClickEventer */
    url?: string;
    /** Title which will be displayed near a menu item when it is hovered */
    title?: string;
    /** Passed to MenuClickProcessor.dataClickEventer handler.  Can be used to easily identify which menu item was clicked */
    id?: string;
    /** Passed to MenuClickProcessor.dataClickEventer handler.  Can hold data specific to this menu item that is used by handler */
    data?: string;
    /** Specifies the type of click handler to use.
     * If undefined, then, if url is defined, the clickHandlerType is set to AnchorTag, otherwise it is set to MenuClickProcessor.
     */
    clickHandlerType?: ClickHandlerType;
    /** Specifies menu items in a sub menu attached to this menu item.  Note that only top level menu items can have children */
    children?: readonly MenuItemDefinition[];
}

export type ClickHandlerType = 'anchorTag' | 'menuClickProcessor';
