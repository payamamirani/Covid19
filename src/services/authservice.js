import { sendVerificationCode } from "./userService";
import {
  login,
  logout,
  getCurrentUser,
  getCurrentUserPrivileges
} from "./sessionService";

export default {
  login,
  logout,
  sendVerificationCode,
  getCurrentUser,
  getCurrentUserPrivileges
};
