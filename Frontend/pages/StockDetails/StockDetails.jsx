import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  DotIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { DotIcon } from "lucide-react";
import React, { useEffect } from "react";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { store } from "@/State/Store";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/Utils/existInWatchlist";
function StockDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(
      fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") })
    );
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [id]);

  const { coin, watchlist } = useSelector((store) => store);

  const handleAddToWatchlist = () => {
    dispatch(
      addItemToWatchlist({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };
  return (
    <div className="p-4 mt-7">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage src={coin.coinDetails?.image.large}></AvatarImage>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-base font-semibold ">
                ${coin.coinDetails?.market_data?.current_price?.usd}
              </p>
              <p
                className={`text-sm ${
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
        <div className="flex items-center gap-5">
          <Button onClick={() => handleAddToWatchlist()}>
            {existInWatchlist(watchlist.items, coin.coinDetails) ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger size="lg">
              <Button className="font-bold">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[#15399f] text-base">
                  How much do you want to spend?
                </DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-8">
        <StockChart coinId={id} />
      </div>
    </div>
  );
}

export default StockDetails;
