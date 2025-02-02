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
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/State/Asset/Action";
import { store } from "@/State/Store";

function Portfolio() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const { asset, auth } = useSelector((store) => store);

  return (
    <>
      <h2 className="text-center px-4 py-3 font-bold text-lg text-[#94A3B8] border-b  border-gray-800">
        Hello{" "}
        <span className="text-[#15399f]">{auth.user?.data?.fullName},</span>{" "}
        Your Success Portfolio Starts Here!
      </h2>
      <div className=" lg:max-h-[84vh] portfolio overflow-y-auto">
        <Table className=" w-full border-b relative">
          <TableHeader className="sticky top-0">
            <TableRow className="bg-[#020817] border-b  border-gray-800 ">
              <TableHead className="w-[120px] text-center px-4 py-2 font-bold text-sm">
                ASSET
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                PRICE
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                UNIT
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                CHANGE
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                CHANGE (%)
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                VOLUME
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="portfolio" size={10}>
            {asset.userAssets.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="font-medium flex items-center gap-2 px-4 py-2 lg:w-44">
                  <Avatar className="-z-50">
                    <AvatarImage src={item.coin.image} />
                  </Avatar>
                  <span className="text-xs">{item.coin.name}</span>
                </TableCell>
                <TableCell className="text-center px-5 py-2 text-xs w-[15vw]">
                  {item.coin.symbol.toUpperCase()}
                </TableCell>
                <TableCell className="text-center px-4 py-2 text-xs">
                  {item.quantity}
                </TableCell>
                <TableCell
                  className={`text-center px-5 py-2 text-xs ${
                    item.coin.price_change_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.coin.price_change_24h}
                </TableCell>
                <TableCell
                  className={`text-center px-5 py-2 text-xs ${
                    item.coin.price_change_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.coin.price_change_percentage_24h}
                </TableCell>
                <TableCell className="text-center px-4 py-2  text-xs">
                  {item.coin.total_volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Portfolio;
