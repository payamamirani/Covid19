import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import auth from "../services/authservice";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { cellNo: "" },
    errors: {}
  };

  schema = {
    cellNo: Joi.string()
      .required()
      .error(() => {
        return {
          message: "شماره موبایل اجباریست"
        };
      })
      .regex(/0?9[0-9]{9}/)
      .error(() => {
        return { message: "شماره موبایل نادرست است" };
      })
      .label("شماره موبایل")
  };

  doSubmit = async () => {
    try {
      await auth.sendVerificationCode(this.state.data.cellNo);
      this.props.history.replace("/verify");
    } catch (ex) {
      toast.error(ex.message);
    }
  };

  render() {
    return (
      <div className="text-center" style={{ marginTop: "30vh" }}>
        <h3>برای ورود یا ثبت ‌نام شماره تلفن همراه خود را وارد کنید</h3>
        <form className="form-signin" onSubmit={this.handleSubmit}>
          {this.renderInput("cellNo", "شماره موبایل")}
          {this.renderButton("ارسال کد تایید")}
        </form>
      </div>
    );
  }
}

export default Login;
