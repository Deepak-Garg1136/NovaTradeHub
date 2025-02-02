import {
  GET_ORDER_REQUEST,
  GET_ALL_ORDERS_REQUEST,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ALL_ORDERS_FAILURE,
  PAY_ORDER_FAILURE,
} from "./ActionType";

const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
    case GET_ALL_ORDERS_REQUEST:
    case PAY_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case PAY_ORDER_SUCCESS:
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case GET_ORDER_FAILURE:
    case GET_ALL_ORDERS_FAILURE:
    case PAY_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
