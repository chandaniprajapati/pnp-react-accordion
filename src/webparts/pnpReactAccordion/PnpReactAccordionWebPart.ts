import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnpReactAccordionWebPartStrings';
import PnpReactAccordion from './components/PnpReactAccordion';
import { IPnpReactAccordionProps } from './components/IPnpReactAccordionProps';

export interface IPnpReactAccordionWebPartProps {
  description: string;
  listName: string;
}

export default class PnpReactAccordionWebPart extends BaseClientSideWebPart<IPnpReactAccordionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnpReactAccordionProps> = React.createElement(
      PnpReactAccordion,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
