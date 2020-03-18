import React from "react";
import Joi from "joi-browser";
import { getRoles } from "../services/roleService";
import { saveUserInfo, getUserInfo } from "../services/userInfoService";
import Form from "./common/form";
import { toast } from "react-toastify";

class Complete extends Form {
  state = {
    roles: [],
    data: {
      name: "",
      family: "",
      email: "",
      phoneNumber: "",
      address: "",
      role: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string().required(),
    family: Joi.string().required(),
    email: Joi.string()
      .email()
      .optional(),
    phoneNumber: Joi.number().optional(),
    address: Joi.string().optional(),
    role: Joi.number().required()
  };

  async componentDidMount() {
    const { data } = await getRoles();
    if (data.success) {
      const roles = data.payload;
      this.setState({ roles });
    }
  }

  doSubmit = async () => {
    const { name, family, address, email, role, phoneNumber } = this.state.data;
    const { data: result } = await saveUserInfo({
      Name: name,
      Family: family,
      Address: address,
      Email: email,
      RoleID: role,
      PhoneNumber: phoneNumber
    });
    if (!result.success) toast.error(result.message);
    const { data: user } = await getUserInfo();
    if (!user.success) toast.error(user.message);

    localStorage.setItem("User", user.payload[0]);

    this.props.history.replace("/logout");
  };

  render() {
    return (
      <div className="text-center">
        <h1>تکیمل اطلاعات کاربری</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "نام")}
          {this.renderInput("family", "نام خانوادگی")}
          {this.renderInput("email", "پست الکترونیک")}
          {this.renderInput("phoneNumber", "تلفن ثابت")}
          {this.renderInput("address", "آدرس")}
          {this.renderSelect("role", "شغل", this.state.roles)}
          {this.renderButton("ذخیره")}
        </form>
      </div>
    );
  }
}

export default Complete;
