import * as React from 'react';
import styles from './PnpReactAccordion.module.scss';
import { IPnpReactAccordionProps } from './IPnpReactAccordionProps';
import { IPnpReactAccordionState } from './IPnpReactAccordionState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPService } from '../../../Service/SPService';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";

export default class PnpReactAccordion extends React.Component<IPnpReactAccordionProps, IPnpReactAccordionState> {

  private _services: SPService = null;
  constructor(props: IPnpReactAccordionProps) {
    super(props);
    this.state = {
      listItems: [],
      errorMessage: ''
    }
    this._services = new SPService(this.props.context);
  }

  public componentDidMount() {
    this.getListItems();
  }

  private async getListItems() {
    if (this.props.listName) {
      let items = await this._services.getListItems(this.props.listName);
      this.setState({ listItems: items });
    }
    else {
      this.setState({ errorMessage: 'Please enter the list name in property pane configuration.' });
    }
  }

  public render(): React.ReactElement<IPnpReactAccordionProps> {
    return (
      <div className={styles.pnpReactAccordion}>
        {
          (this.state.listItems && this.state.listItems.length) ? this.state.listItems.map((item, index) => (
            <Accordion title={item.Title} defaultCollapsed={true} className={"itemCell"} key={index}>
              <div className={"itemContent"}>
                <div className={"itemResponse"} dangerouslySetInnerHTML={{ __html: item.Description }}></div>
              </div>
            </Accordion>
          )) : <p>{this.state.errorMessage}</p>
        }
      </div>
    );
  }
}
