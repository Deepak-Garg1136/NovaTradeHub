import axios from "axios";
import {
  ADD_COIN_TO_WATCHLIST_FAILURE,
  ADD_COIN_TO_WATCHLIST_REQUEST,
  ADD_COIN_TO_WATCHLIST_SUCCESS,
  GET_USER_WATCHLIST_FAILURE,
  GET_USER_WATCHLIST_REQUEST,
  GET_USER_WATCHLIST_SUCCESS,
} from "./ActionType";

export const getUserWatchlist = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_WATCHLIST_REQUEST });
    const watchlist = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/watchlist/user`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_USER_WATCHLIST_SUCCESS, payload: watchlist.data });
    console.log("GET USER WATCHLIST", watchlist.data);
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_WATCHLIST_FAILURE, payload: error.message });
  }
};

export const addItemToWatchlist =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_COIN_TO_WATCHLIST_REQUEST });
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/watchlist/add/coin/${coinId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: ADD_COIN_TO_WATCHLIST_SUCCESS, payload: response.data });
      console.log("ADD COIN TO WATCHLIST", response.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_COIN_TO_WATCHLIST_FAILURE, payload: error.message });
    }
  };
