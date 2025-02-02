import axios from "axios";
import {
  GET_ASSET_FAILURE,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSETS_DETAILS_FAILURE,
  GET_ASSETS_DETAILS_REQUEST,
  GET_ASSETS_DETAILS_SUCCESS,
  GET_USER_ASSETS_FAILURE,
  GET_USER_ASSETS_REQUEST,
  GET_USER_ASSETS_SUCCESS,
} from "./ActionType";

export const getAssetById =
  ({ assetId, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ASSET_REQUEST });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/asset/${assetId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: GET_ASSET_SUCCESS, payload: response.data });
      console.log("GET ASSET SUCCESS", response.data);
    } catch (error) {
      dispatch({ type: GET_ASSET_FAILURE, payload: error.message });
      console.log("GET ASSET ERROR", error.message);
    }
  };

export const getAssetDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ASSETS_DETAILS_REQUEST });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/asset/coin/${coinId}/user`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: GET_ASSETS_DETAILS_SUCCESS, payload: response.data });
      console.log("GET ASSET DETAILS SUCCESS", response.data);
    } catch (error) {
      dispatch({ type: GET_ASSETS_DETAILS_FAILURE, payload: error.message });
      console.log("GET ASSET DETAILS ERROR", error.message);
    }
  };

export const getUserAssets = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ASSETS_REQUEST });
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/asset`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_USER_ASSETS_SUCCESS, payload: response.data });
    console.log("GET USER ASSETS SUCCESS", response.data);
  } catch (error) {
    dispatch({ type: GET_USER_ASSETS_FAILURE, payload: error.message });
    console.log("GET USER ASSETS ERROR", error.message);
  }
};
