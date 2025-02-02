import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
} from "./ActionType";
import Swal from "sweetalert2";
import axios from "axios";

export const getCoinList = (page) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_COIN_LIST_REQUEST,
    });
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/coins?page=${page}`
    );

    console.log(data);

    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
    // Swal.fire({
    //   icon: "error",
    //   title: "OOPS",
    //   text: "Failed to fetch the coin list",
    //   background: "#01020A",
    //   color: "#F8FAFC",
    //   confirmButtonColor: "#ff6b6b",
    // });
  }
};

export const getTop50CoinList = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_TOP_50_COINS_REQUEST,
    });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/coins/top50`
    );

    console.log(response.data);

    dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
    // Swal.fire({
    //   icon: "error",
    //   title: "OOPS",
    //   text: "Failed to fetch the coin list",
    //   background: "#01020A",
    //   color: "#F8FAFC",
    //   confirmButtonColor: "#ff6b6b",
    // });
  }
};

export const fetchMarketChart =
  ({ coinId, days, jwt }) =>
  async (dispatch) => {
    try {
      console.log("Fetching chart");
      dispatch({
        type: FETCH_MARKET_CHART_REQUEST,
      });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/coins/${coinId}/chart?days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
      //   Swal.fire({
      //     icon: "error",
      //     title: "OOPS",
      //     text: "Failed to fetch the chart",
      //     background: "#01020A",
      //     color: "#F8FAFC",
      //     confirmButtonColor: "#ff6b6b",
      //   });
    }
  };

export const fetchCoinById = (coinId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_COIN_BY_ID_REQUEST,
    });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/coins/${coinId}`
    );

    console.log(response.data);

    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
    // Swal.fire({
    //   icon: "error",
    //   title: "OOPS",
    //   text: "Failed to fetch the chart",
    //   background: "#01020A",
    //   color: "#F8FAFC",
    //   confirmButtonColor: "#ff6b6b",
    // });
  }
};

export const fetchCoinDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    try {
      console.log("Fetching");
      dispatch({
        type: FETCH_COIN_DETAILS_REQUEST,
      });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/coins/details/${coinId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      //   console.log(response.data);

      dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
      //   Swal.fire({
      //     icon: "error",
      //     title: "OOPS",
      //     text: "Failed to fetch the coin details",
      //     background: "#01020A",
      //     color: "#F8FAFC",
      //     confirmButtonColor: "#ff6b6b",
      //   });
    }
  };

export const searchCoin = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_COIN_REQUEST,
    });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/coins/search?q=${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
    // Swal.fire({
    //   icon: "error",
    //   title: "OOPS",
    //   text: "Coin does not exist",
    //   background: "#01020A",
    //   color: "#F8FAFC",
    //   confirmButtonColor: "#ff6b6b",
    // });
  }
};
