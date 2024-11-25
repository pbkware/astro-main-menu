export interface MenuItemDefinition {
    text: string;
    url?: string;
    title?: string;
    id?: string;
    data?: string;
    children?: readonly MenuItemDefinition[];
}
