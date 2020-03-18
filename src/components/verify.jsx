import React from "react";
import Form from "./common/form";
import auth from "../services/authservice";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class Verify extends Form {
  state = {
    data: { verifyCode: "" },
    errors: {}
  };

  schema = {
    verifyCode: Joi.string()
      .required()
      .error(() => {
        return {
          message: "کد تایید اجباریست"
        };
      })
      .error(() => {
        return { message: "کد تایید نادرست است" };
      })
      .label("کد تایید")
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data.verifyCode);
      window.location = "/";
    } catch (ex) {
      toast.error(ex.message);
    }
  };

  render() {
    return (
      <div className="text-center" style={{ marginTop: "30vh" }}>
        <h3>کد تایید ارسال شده به شماره {this.props.cellNo} را وارد کنید.</h3>
        <form className="form-signin" onSubmit={this.handleSubmit}>
          {this.renderInput("verifyCode", "کد تایید")}
          {this.renderButton("ورود")}
        </form>
      </div>
    );
  }
}

export default Verify;
