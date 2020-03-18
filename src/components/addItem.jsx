import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

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
    count: Joi.number().optional()
  };

  render() {
    const { items, title } = this.props;
    const item = items.find(i => i.ID === parseInt(this.state.data.item));

    return (
      <div className="rtl text-right mt-2">
        <h1>{title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("item", "جنس / شغل", items)}
          {item && item.HasCount && this.renderInput("count", "تعداد")}
          {this.renderButton("ارسال درخواست")}
        </form>
      </div>
    );
  }
}

export default AddItem;
