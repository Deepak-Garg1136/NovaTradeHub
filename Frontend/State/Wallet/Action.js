import {
  DEPOSITE_MONEY_FAILURE,
  DEPOSITE_MONEY_REQUEST,
  DEPOSITE_MONEY_SUCCESS,
  GET_USER_WALLET_FAILURE,
  GET_USER_WALLET_REQUEST,
  GET_USER_WALLET_SUCCESS,
  GET_WALLET_TRANSACTION_FAILURE,
  GET_WALLET_TRANSACTION_REQUEST,
  GET_WALLET_TRANSACTION_SUCCESS,
  TRANSFER_MONEY_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
} from "./ActionType";
import axios from "axios";
import Swal from "sweetalert2";

export const getUserWallet = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_WALLET_REQUEST });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/wallet`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("wallet", response.data);
    dispatch({ type: GET_USER_WALLET_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_USER_WALLET_FAILURE, payload: error.message });
  }
};

export const getWalletTransactions =
  ({ jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/transactions`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: GET_WALLET_TRANSACTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: GET_WALLET_TRANSACTION_FAILURE,
        payload: error.message,
      });
    }
  };

export const depositeMoney =
  ({ jwt, orderId, paymentId, navigate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEPOSITE_MONEY_REQUEST });
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/wallet/deposite`,
        null,
        {
          params: { order_id: orderId, payment_id: paymentId },

          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: DEPOSITE_MONEY_SUCCESS,
        payload: response.data,
      });
      Swal.fire({
        icon: "success",
        title: "Money added successfully!",
        background: "#01020A",
        color: "#F8FAFC",
        confirmButtonColor: "#22c55e",
      }).then((value) => {
        navigate("/wallet");
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: DEPOSITE_MONEY_FAILURE,
        payload: error.message,
      });
      Swal.fire({
        icon: "error",
        title: "OOPS",
        text: "Failed to add money. Please try again",
        background: "#01020A",
        color: "#F8FAFC",
        confirmButtonColor: "#ff6b6b",
      });
    }
  };

export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEPOSITE_MONEY_REQUEST });
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      window.location.href = response.data.payment_url;
      //   dispatch({
      //     type: DEPOSITE_MONEY_SUCCESS,
      //     payload: response.data,
      //   });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: DEPOSITE_MONEY_FAILURE,
        payload: error.message,
      });
    }
  };

export const transferMoney =
  ({ jwt, walletId, reqData }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TRANSFER_MONEY_REQUEST });
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/wallet/${walletId}/transfer`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: TRANSFER_MONEY_SUCCESS,
        payload: response.data,
      });
      Swal.fire({
        icon: "success",
        title: "Transaction Successful",
        text: "Your money has been transferred successfully.",
        background: "#01020A",
        color: "#F8FAFC",
        confirmButtonColor: "#22c55e",
      });
      console.log("**************************************", response.data);
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: TRANSFER_MONEY_FAILURE,
        payload: error.message,
      });
      Swal.fire({
        icon: "error",
        title: "Transaction Unsuccessful",
        text: "We couldn't process your request at the moment. Please try again later.",
        background: "#01020A",
        color: "#F8FAFC",
        confirmButtonColor: "#ff6b6b",
      });
    }
  };
