import axios from "axios";
import {
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "./ActionType";

export const payOrder =
  ({ jwt, orderData, amount }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PAY_ORDER_REQUEST });
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/orders/pay`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: PAY_ORDER_SUCCESS,
        payload: response.data,
        amount,
      });
      console.log("order success", response.data);
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: PAY_ORDER_FAILURE,
        payload: error.message,
      });
    }
  };

export const getOrderById = (jwt, orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    console.log("order by id", response.data);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllOrdersForUser =
  ({ jwt, orderType, assetSymbol }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ORDERS_REQUEST });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            order_type: orderType,
            asset_symbol: assetSymbol,
          },
        }
      );
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: response.data });
      console.log("all orders for user", response.data);
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: GET_ALL_ORDERS_FAILURE,
        payload: error.message,
      });
    }
  };
