import { toast } from "react-hot-toast";
import axiosConnector from "../apiConnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../reducer/slices/authSlice";
import { resetCart } from "../../reducer/slices/cartSlice";
import { setUser } from "../../reducer/slices/profileSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export const sendOTP = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const res = await axiosConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE............", res);

      console.log(res.data.success);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("OTP Sent Successfully");

      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  console.log(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp
  );
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector("POST", SIGNUP_API, {
        accountType,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.data?.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

      dispatch(setUser({ ...response.data.data, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data, image: userImage })
      );

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);

      toast.error("Signup Failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.data?.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

      dispatch(setUser({ ...response.data.data, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data, image: userImage })
      );

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());

    console.log(dispatch);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error.response.data.message);
      toast.error("Unable to reset password");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
