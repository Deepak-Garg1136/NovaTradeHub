import {
  DEPOSITE_MONEY_FAILURE,
  DEPOSITE_MONEY_REQUEST,
  DEPOSITE_MONEY_SUCCESS,
  GET_USER_WALLET_FAILURE,
  GET_USER_WALLET_REQUEST,
  GET_USER_WALLET_SUCCESS,
  GET_WALLET_TRANSACTION_SUCCESS,
  TRANSFER_MONEY_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
} from "./ActionType";

const initialState = {
  userWallet: {},
  loading: false,
  error: null,
  transactions: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WALLET_REQUEST:
    case DEPOSITE_MONEY_REQUEST:
    case TRANSFER_MONEY_REQUEST:
    case GET_USER_WALLET_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
        error: null,
      };

    case GET_USER_WALLET_SUCCESS:
    case TRANSFER_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };

    case DEPOSITE_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER_WALLET_FAILURE:
    case DEPOSITE_MONEY_FAILURE:
    case TRANSFER_MONEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default walletReducer;
