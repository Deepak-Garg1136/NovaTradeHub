import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { store } from "@/State/Store";

function WatchList() {
  const dispatch = useDispatch();
  const { watchlist, auth } = useSelector((store) => store);
  const handleRemoveFromWatchList = (value) => {
    dispatch(
      addItemToWatchlist({ coinId: value, jwt: localStorage.getItem("jwt") })
    );
  };

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, []);

  return (
    <>
      <h2 className="text-center px-4 py-3 font-bold text-lg text-[#94A3B8] border-b  border-gray-800">
        Hello{" "}
        <span className="text-[#15399f]">{auth.user?.data?.fullName},</span>{" "}
        Track Your Top Picks in One Place!
      </h2>
      <div className=" lg:max-h-[84vh] portfolio overflow-y-auto">
        <Table className=" w-full border-b relative">
          <TableHeader className="sticky top-0">
            <TableRow className="bg-[#020817] border-b  border-gray-800 ">
              <TableHead className="w-[120px] text-center px-4 py-2 font-bold text-sm">
                COIN
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                SYMBOL
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                VOLUME
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                MARKET CAP
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                24H
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                PRICE
              </TableHead>
              <TableHead className="text-center px-[-1] py-4 font-bold text-sm text-red-600">
                REMOVE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="portfolio" size={10}>
            {watchlist.items.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="font-medium flex items-center gap-2 px-4 py-2 lg:w-44">
                  <Avatar className="-z-50">
                    <AvatarImage src={item.image} />
                  </Avatar>
                  <span className="text-xs">{item.name}</span>
                </TableCell>
                <TableCell className="text-center px-5 py-2 text-xs w-[15vw]">
                  {item.symbol.toUpperCase()}
                </TableCell>
                <TableCell className="text-center px-4 py-2 text-xs">
                  {item.total_volume}
                </TableCell>
                <TableCell className="text-center px-5 py-2 text-xs">
                  {item.market_cap}
                </TableCell>
                <TableCell
                  className={`text-center px-5 py-2 text-xs ${
                    item.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.price_change_percentage_24h}
                </TableCell>
                <TableCell className="text-center px-4 py-2  text-xs">
                  ${item.current_price}
                </TableCell>
                <TableCell className="text-center px-[-1] py-2  text-xs">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveFromWatchList(item.id)}
                  >
                    <BookmarkFilledIcon className="w-7 h-7" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default WatchList;
