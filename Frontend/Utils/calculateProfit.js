export const calculateProfit = (order) => {
  if (order && order.orderItem?.buyPrice && order.orderItem?.sellprice) {
    return order.orderItem?.sellprice - order.orderItem?.buyPrice;
  }
  return "-";
};
