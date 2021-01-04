interface IListItem {
    Id?: string;
    Title: string;
    Description: string
}

export interface IPnpReactAccordionState {
    listItems: IListItem[];
    errorMessage: string;
}