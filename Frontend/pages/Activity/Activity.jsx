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
import { getAllOrdersForUser } from "@/State/Order/Action";
import { store } from "@/State/Store";
import { calculateProfit } from "@/Utils/calculateProfit";

function Activity() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);
  const { order, auth } = useSelector((store) => store);

  return (
    <>
      <h2 className="text-center px-4 py-3 font-bold text-lg text-[#94A3B8] border-b  border-gray-800">
        Welcome Back,{" "}
        <span className="text-[#15399f]">{auth.user?.data?.fullName}!</span>{" "}
        Review Your Recent Moves
      </h2>
      <div className=" lg:max-h-[84vh] portfolio overflow-y-auto">
        <Table className=" w-full border-b relative">
          <TableHeader className="sticky top-0">
            <TableRow className="bg-[#020817] border-b  border-gray-800 ">
              <TableHead className="text-center px-4 py-2 font-bold text-sm">
                DATE & TIME
              </TableHead>
              <TableHead className="w-[120px] text-center px-4 py-2 font-bold text-sm">
                TRADING PAIR
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                BUY PRICE
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                SELL PRICE
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                ORDER TYPE
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                PROFIT/LOSS
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                VALUE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="portfolio" size={10}>
            {order.orders.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="text-center px-5 py-2 text-xs w-[15vw]">
                  <p>{item.timeStamp.toString().split("T")[0]}</p>
                  <p className="text-[#15399f]">
                    {item.timeStamp.toString().split("T")[1]}
                  </p>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2 px-4 py-2 lg:w-44">
                  <Avatar className="-z-50">
                    <AvatarImage src={item.orderItem?.coin?.image} />
                  </Avatar>
                  <span className="text-xs">{item.orderItem?.coin?.name}</span>
                </TableCell>

                <TableCell className="text-center px-4 py-2 text-xs">
                  ${item.orderItem?.buyPrice}
                </TableCell>
                <TableCell className="text-center px-5 py-2 text-xs">
                  ${item.orderItem?.sellprice}
                </TableCell>
                <TableCell className="text-center px-5 py-2 text-xs">
                  {item.orderType}
                </TableCell>
                <TableCell
                  className={`text-center px-4 py-2  text-xs ${
                    calculateProfit(item) != "-"
                      ? calculateProfit(item) > 0
                        ? "text-green-600"
                        : calculateProfit(item) < 0
                        ? "text-red-600"
                        : "text-[#15399f]"
                      : ""
                  }`}
                >
                  {calculateProfit(item) != "-"
                    ? "$" + calculateProfit(item)
                    : calculateProfit(item)}
                </TableCell>
                <TableCell className="text-center px-4 py-2  text-xs">
                  {item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Activity;
