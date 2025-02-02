import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";
import { store } from "@/State/Store";
import { getUserWallet } from "@/State/Wallet/Action";
import { DotIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
function TradingForm() {
  const [amount, setAmount] = useState();
  const [orderType, setOrderType] = useState("BUY");
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { coin, wallet, asset } = useSelector((store) => store);

  useEffect(() => {
    handleFetchUserWallet();
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  // console.log(coin.coinDetails);
  const handleChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    console.log(coin.coinDetails.market_data.current_price.usd);
    const volume = calculateByCost(
      amount,
      coin.coinDetails.market_data.current_price.usd
    );
    setQuantity(volume);
  };

  const calculateByCost = (amount, price) => {
    let volume = amount / price;

    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return volume.toFixed(decimalPlaces);
  };

  const handleBuyCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails.id,
          quantity,
          orderType,
        },
      })
    );
  };
  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-6 focus:outline-none"
            placeholder="Enter Amount..."
            type="number"
            value={amount}
            onChange={handleChange}
          />

          <div>
            <p className="border text-lg flex justify-center items-center w-32 h-[3.1rem] rounded-md">
              {quantity}
            </p>
          </div>
        </div>
        {false && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficient Balance to Buy
          </h1>
        )}
      </div>
      <div className="flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image?.large}></AvatarImage>
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm">{coin.coinDetails?.symbol.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400 text-sm">{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-sm font-semibold ">
              ${coin.coinDetails?.market_data.current_price.usd}
            </p>
            <p
              className={`text-xs ${
                coin.coinDetails?.market_data?.market_cap_change_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              <span>
                {coin.coinDetails?.market_data?.market_cap_change_24h}
              </span>
              <span>
                {" "}
                (
                {
                  coin.coinDetails?.market_data
                    ?.market_cap_change_percentage_24h
                }
                %)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm">Order Type</p>
        <p className="text-sm">Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm">
          {orderType == "BUY" ? "Available Cash" : "Available Quantity"}
        </p>
        <p className="text-sm">
          {orderType == "BUY"
            ? "$" + wallet?.userWallet?.balance
            : asset?.assetDetails?.quantity || 0}
        </p>
      </div>

      <div>
        <Button
          onClick={handleBuyCrypto}
          className={`w-full text-sm font-bold
            py-5 ${orderType == "SELL" ? "bg-pink-800 " : ""}`}
        >
          {orderType}
        </Button>
        <Button
          variant="ghost"
          className="w-full mt-4  text-sm font-bold"
          onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
        >
          {orderType == "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
}
export default TradingForm;
