import React from "react";
import { saveRequest } from "../services/requestService";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";

class AddItem extends Form {
  state = {
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

  doSubmit = async () => {
    const { item, count } = this.state.data;
    const { data: result } = await saveRequest({
      RequestType: 2,
      ItemID: item,
      Count: count === "" ? 0 : count
    });
    if (!result.success) toast.error(result.message);
    toast.success("ثبت درخواست با موفقیت انجام شد.");
    this.setState({ data: { item: "", count: "" } });
  };

  render() {
    const { items, title } = this.props;
    const item = items.find(i => i.ID === parseInt(this.state.data.item));

    return (
      <div className="rtl text-right mt-2">
        <h1>{title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("item", "جنس / شغل", items)}
          {this.renderInput(
            "count",
            "تعداد",
            "text",
            !(item && !!item.HasCount)
          )}
          {this.renderButton("ارسال درخواست")}
        </form>
      </div>
    );
  }
}

export default AddItem;
