import React, { Component } from "react";
import { getPrivileges } from "../services/privilegeService";
import { getItems } from "../services/itemService";
import { toast } from "react-toastify";
import AddItem from "./addItem";
import NeedItem from "./needItem";

class Home extends Component {
  state = {
    privileges: [],
    items: []
  };

  async componentDidMount() {
    const { data: privilage } = await getPrivileges();
    if (!privilage.success) toast.error(privilage.message);

    const { data: items } = await getItems();
    if (!items.success) toast.error(items.message);

    this.setState({ privileges: privilage.payload, items: items.payload });
  }

  render() {
    const { privileges, items } = this.state;

    return (
      <React.Fragment>
        <ul className="nav nav-tabs">
          {privileges.map(p => (
            <li key={p.ID} className="nav-item">
              <a className="nav-link" data-toggle="tab" href={`#Tab${p.Gid}`}>
                {p.Title}
              </a>
            </li>
          ))}
        </ul>

        <div className="tab-content">
          {privileges.map(p => (
            <div key={p.ID} className="tab-pane container" id={`Tab${p.Gid}`}>
              {p.Gid === "E04597DB-ADA7-486B-A29F-66709DAD72E5" ? (
                <AddItem items={items} title={p.Title} />
              ) : (
                ""
              )}
              {p.Gid === "0E749937-B58C-4B7D-AB20-E833AF083651" ? (
                <NeedItem items={items} />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
