import React from "react";
import Joi from "joi-browser";
import { getRoles } from "../services/roleService";
import { getDoctorTypes } from "../services/doctorTypeService";
import { saveUserInfo, getUserInfo } from "../services/userInfoService";
import Form from "./common/form";
import { toast } from "react-toastify";

class Complete extends Form {
  state = {
    doctorTypes: [],
    roles: [],
    data: {
      name: "",
      family: "",
      email: "",
      phoneNumber: "",
      address: "",
      role: "",
      doctorType: "",
      doctorCode: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: "نام اجباریست"
        };
      })
      .label("نام"),
    family: Joi.string()
      .required()
      .error(() => {
        return {
          message: "نام خانوادگی اجباریست"
        };
      })
      .label("نام خانوادگی"),
    email: Joi.string()
      .email()
      .error(() => {
        return { message: "پست الکترونیک نادرست است." };
      })
      .allow("")
      .label("پست الکترونیک"),
    phoneNumber: Joi.number()
      .error(() => {
        return { message: "شماره تلفن نادرست است." };
      })
      .allow("")
      .label("شماره تلفن"),
    address: Joi.string()
      .allow("")
      .label("آدرس"),
    role: Joi.number()
      .required()
      .error(() => {
        return { message: "شغل نادرست است." };
      })
      .label("شغل"),
    doctorType: Joi.number()
      .allow("")
      .label("تخصص"),
    doctorCode: Joi.number()
      .error(() => {
        return { message: "کد نادرست است." };
      })
      .allow("")
      .label("کد نظام پزشکی")
  };

  async componentDidMount() {
    const { data } = await getRoles();
    if (data.success) {
      const roles = data.payload;
      const { data: doctorType } = await getDoctorTypes();
      if (doctorType.success) {
        this.setState({ roles, doctorTypes: doctorType.payload });
      }
    }
  }

  doSubmit = async () => {
    const {
      name,
      family,
      address,
      email,
      role,
      phoneNumber,
      doctorCode,
      doctorType
    } = this.state.data;
    const { data: result } = await saveUserInfo({
      Name: name,
      Family: family,
      Address: address,
      Email: email,
      RoleID: role,
      PhoneNumber: phoneNumber,
      DoctorCode: doctorCode,
      DoctorTypeID: doctorType
    });
    if (!result.success) toast.error(result.message);
    const { data: user } = await getUserInfo();
    if (!user.success) toast.error(user.message);

    localStorage.setItem("User", JSON.stringify(user.payload[0]));

    window.location = "/";
  };

  render() {
    const { roles, doctorTypes, data } = this.state;
    const role = roles.find(r => r.ID === parseInt(data.role));

    return (
      <div className="container text-center mt-3 rtl">
        <div className="m-auto" style={{ maxWidth: 400 }}>
          <h1>تکیمل اطلاعات کاربری</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "نام")}
            {this.renderInput("family", "نام خانوادگی")}
            {this.renderInput("email", "پست الکترونیک")}
            {this.renderInput("phoneNumber", "تلفن ثابت")}
            {this.renderInput("address", "آدرس")}
            {this.renderSelect("role", "شغل", roles)}
            {role &&
              role.NeedAut &&
              this.renderSelect("doctorType", "تخصص", doctorTypes)}
            {role &&
              role.NeedAut &&
              this.renderInput("doctorCode", "کد نظام پزشکی")}
            {this.renderButton("ذخیره")}
          </form>
        </div>
      </div>
    );
  }
}

export default Complete;
