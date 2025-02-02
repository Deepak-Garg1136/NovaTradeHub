import { existInWatchlist } from "@/Utils/existInWatchlist";
import {
  GET_USER_WATCHLIST_REQUEST,
  ADD_COIN_TO_WATCHLIST_REQUEST,
  GET_USER_WATCHLIST_SUCCESS,
  ADD_COIN_TO_WATCHLIST_SUCCESS,
  ADD_COIN_TO_WATCHLIST_FAILURE,
} from "./ActionType";
import { GET_USER_WALLET_FAILURE } from "../Wallet/ActionType";

const initialState = {
  watchlist: null,
  loading: false,
  error: null,
  items: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WATCHLIST_REQUEST:
    case ADD_COIN_TO_WATCHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.payload,
        items: action.payload.coins,
        error: null,
      };

    case ADD_COIN_TO_WATCHLIST_SUCCESS:
      let updatedWatchlist = existInWatchlist(state.items, action.payload)
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [action.payload, ...state.items];
      return {
        ...state,
        items: updatedWatchlist,
        loading: false,
        error: null,
      };

    case GET_USER_WALLET_FAILURE:
    case ADD_COIN_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default watchlistReducer;
