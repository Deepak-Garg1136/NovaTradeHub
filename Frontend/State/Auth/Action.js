import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";

export const register = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const user = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/signup`,
      userData
    );

    if (user.status != 201) {
      throw new Error(`Something went wrong, Please try again!`);
    }

    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.data });
    localStorage.setItem("jwt", user.data.jwt);
    Swal.fire({
      icon: "success",
      title: "Registration successful!",
      text: "You can now log in with your credentials.",

      background: "#01020A",
      color: "#F8FAFC",
      confirmButtonColor: "#22c55e",
    }).then((value) => {
      navigate("/login");
      return user;
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: "An error occurred. Please try again.",
      background: "#01020A",
      color: "#F8FAFC",
      confirmButtonColor: "#ff6b6b",
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const user = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/signin`,
      userData.data
    );

    if (user.status !== 200) {
      console.log(user.status);

      throw new Error(`Something went wrong, Please try again!`);
    }

    console.log(user.data.jwt);

    dispatch({ type: LOGIN_SUCCESS, payload: user.data });
    localStorage.setItem("jwt", user.data.jwt);
    userData.navigate("/");
  } catch (error) {
    console.log(error);

    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Unable to authenticate. Check your credentials.",
      background: "#01020A",
      color: "#F8FAFC",

      confirmButtonColor: "#ff6b6b",
    });
  }
};

export const getUser = (jwt) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
    });
    const user = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    if (user.status != 200) {
      throw new Error(`Something went wrong, Please try again!`);
    }

    // console.log(user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

export const logout = (dispatch, navigate) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
  navigate("/login");
};
