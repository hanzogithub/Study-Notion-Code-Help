import { toast } from "react-hot-toast";
import { setUser, setLoading } from "../../reducer/slices/profileSlice";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import axiosConnector from "../apiConnector";
import { setToken } from "../../reducer/slices/authSlice";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector(
        "PATCH",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Display Picture Updated Successfully");

      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

      dispatch(setUser({ ...response.data.data, image: userImage }));

      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data, image: userImage })
      );
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector(
        "PATCH",
        UPDATE_PROFILE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

      dispatch(setUser({ ...response.data.data, image: userImage }));

      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data, image: userImage })
      );

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function changePassword(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await axiosConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Changed Successfully");

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
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error);
      toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
  };
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axiosConnector(
        "DELETE",
        DELETE_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}
