import React from "react";
import { getItems } from "../services/itemService";
import { saveRequest } from "../services/requestService";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";

class NeedItem extends Form {
  state = {
    items: [],
    data: {
      item: "",
      count: ""
    },
    errors: {}
  };

  schema = {
    item: Joi.number().required(),
    count: Joi.number().allow("")
  };

  async componentDidMount() {
    const { data: items } = await getItems();
    if (items.success) this.setState({ items: items.payload });
  }

  doSubmit = async () => {
    const { item, count } = this.state.data;
    const { data: result } = await saveRequest({
      RequestType: 1,
      ItemID: item,
      Count: count === "" ? 0 : count
    });
    if (!result.success) toast.error(result.message);
    toast.success("ثبت درخواست با موفقیت انجام شد.");
    this.setState({ data: { item: "", count: "" } });
  };

  render() {
    const { items } = this.state;
    const item = items.find(i => i.ID === parseInt(this.state.data.item));

    return (
      <React.Fragment>
        <form className="m-auto max-width-400" onSubmit={this.handleSubmit}>
          {this.renderSelect("item", "جنس / شغل", items)}
          {this.renderInput(
            "count",
            "تعداد",
            "text",
            !(item && !!item.HasCount)
          )}
          {this.renderButton("ارسال درخواست")}
        </form>
      </React.Fragment>
    );
  }
}

export default NeedItem;
