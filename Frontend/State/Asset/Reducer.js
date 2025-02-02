import {
  GET_ASSET_FAILURE,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSETS_DETAILS_FAILURE,
  GET_ASSETS_DETAILS_SUCCESS,
  GET_USER_ASSETS_FAILURE,
  GET_USER_ASSETS_REQUEST,
  GET_USER_ASSETS_SUCCESS,
} from "./ActionType";

const initialState = {
  asset: null,
  userAssets: [],
  loading: false,
  error: null,
  assetDetails: null,
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSET_REQUEST:
    case GET_USER_ASSETS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ASSET_SUCCESS:
      return {
        ...state,
        loading: false,
        asset: action.payload,
        error: null,
      };
    case GET_ASSETS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        assetDetails: action.payload,
        error: null,
      };
    case GET_USER_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAssets: action.payload,
        error: null,
      };

    case GET_ASSET_FAILURE:
    case GET_USER_ASSETS_FAILURE:
    case GET_ASSETS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default assetReducer;
