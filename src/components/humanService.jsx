import React from "react";
import { getServices } from "../services/serviceService";
import { postHumanServices, getHumanService } from "../services/humanService";
import Joi from "joi-browser";
import { momentJalali, toMomentJalaliDateTime } from "../utils/utils";
import Form from "./common/form";
import { toast } from "react-toastify";

class HumanService extends Form {
  state = {
    id: this.props.match.params.id,
    data: {
      fromDateTime: "",
      toDateTime: "",
      serviceId: "",
      address: ""
    },
    errors: {},
    services: []
  };

  schema = {
    serviceId: Joi.number()
      .required()
      .error(() => {
        return {
          message: "خدمت نادرست است."
        };
      })
      .label("خدمت"),
    fromDateTime: Joi.required(),
    toDateTime: Joi.required(),
    address: Joi.string()
      .required()
      .error(() => {
        return {
          message: "آدرس نادرست است."
        };
      })
      .label("آدرس")
  };

  async componentDidMount() {
    let newData = { ...this.state.data };
    newData.fromDateTime = momentJalali();
    newData.toDateTime = momentJalali();
    const { data: service } = await getServices();
    if (service.success) {
      if (this.state.id) {
        const { data: request } = await getHumanService(this.state.id);
        if (!request.success) {
          toast.error(request.message);
        } else {
          const currentValues = request.payload[0];
          newData.fromDateTime = toMomentJalaliDateTime(
            currentValues.FromDateTime
          );
          newData.toDateTime = toMomentJalaliDateTime(currentValues.ToDateTime);
          newData.address = currentValues.Address;
          newData.serviceId = currentValues.ServiceID;
        }
      }
      this.setState({
        services: service.payload,
        data: newData
      });
    }
  }

  doSubmit = async () => {
    const { id } = this.state;
    const { fromDateTime, toDateTime, serviceId, address } = this.state.data;
    const { data: result } = await postHumanServices({
      ID: id === undefined ? 0 : id,
      Address: address,
      FromDate: fromDateTime.format("jYYYY/jMM/jDD"),
      ToDate: toDateTime.format("jYYYY/jMM/jDD"),
      FromTime: fromDateTime.format("HH:mm"),
      ToTime: toDateTime.format("HH:mm"),
      ServiceID: serviceId
    });
    if (result.success) return this.props.history.push("/humanservicereport");
    toast.error(result.message);
  };

  render() {
    const { services } = this.state;
    return (
      <React.Fragment>
        <form className="m-auto max-width-400" onSubmit={this.handleSubmit}>
          {this.renderDateTime("fromDateTime", "از")}
          {this.renderDateTime("toDateTime", "تا")}
          {this.renderSelect("serviceId", "خدمت", services)}
          {this.renderTextArea("address", "آدرس")}
          {this.renderButton("ذخیره")}
        </form>
      </React.Fragment>
    );
  }
}

export default HumanService;
