import axios from "axios";
import Swal from "sweetalert2";
import {
  ADD_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,
  GET_WITHDRAWAL_REQUEST_REQUEST,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
} from "./ActionType";

export const withdrawalRequest =
  ({ amount, jwt, navigate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: WITHDRAWAL_REQUEST });
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/withdrawal/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: WITHDRAWAL_SUCCESS, payload: response.data });
      console.log("WITHDRAWAL", response.data);
      Swal.fire({
        icon: "success",
        title: "Money Withdrawn Successfully!",
        background: "#01020A",
        color: "#F8FAFC",
        confirmButtonColor: "#22c55e",
      });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: WITHDRAWAL_FAILURE, payload: error.message });
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "We were unable to process your request. Please try again later.",
        background: "#01020A",
        color: "#F8FAFC",
        confirmButtonColor: "#ff6b6b",
      });
    }
  };

export const proceedWithdrawal =
  ({ id, jwt, accept }) =>
  async (dispatch) => {
    try {
      dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });
      const response = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/admin/withdrawal/${id}/proceed/${accept}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: WITHDRAWAL_PROCEED_SUCCESS, payload: response.data });
      console.log("Proceed WITHDRAWAL", response.data);
    } catch (error) {
      console.log(error.message);
      dispatch({ type: WITHDRAWAL_PROCEED_FAILURE, payload: error.message });
    }
  };

export const getWithdrawalHistory = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/withdrawal`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_WITHDRAWAL_HISTORY_SUCCESS, payload: response.data });
    console.log("WITHDRAWAL HISTORY", response.data);
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_WITHDRAWAL_HISTORY_FAILURE, payload: error.message });
  }
};

export const getAllWithdrawalRequest = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_WITHDRAWAL_REQUEST_REQUEST });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/withdrawal`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_WITHDRAWAL_REQUEST_SUCCESS, payload: response.data });
    console.log("ALL WITHDRAWAL", response.data);
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_WITHDRAWAL_REQUEST_FAILURE, payload: error.message });
  }
};

export const addPaymentDetails =
  ({ paymentDetails, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment-details`,
        paymentDetails,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: ADD_PAYMENT_DETAILS_SUCCESS, payload: response.data });
      console.log("ADD PAYMENT DETAILS", response.data);
    } catch (error) {
      console.log(error.message);
      dispatch({ type: ADD_PAYMENT_DETAILS_FAILURE, payload: error.message });
    }
  };

export const getPaymentDetails =
  ({ jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/payment-details`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: GET_PAYMENT_DETAILS_SUCCESS, payload: response.data });
      console.log("GET PAYMENT DETAILS", response.data);
    } catch (error) {
      console.log(error.message);
      dispatch({ type: GET_PAYMENT_DETAILS_FAILURE, payload: error.message });
    }
  };
