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
import { store } from "@/State/Store";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";
function Withdrawal() {
  const dispatch = useDispatch();
  const { withdrawal, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);
  return (
    <>
      <h2 className="text-center px-4 py-3 font-bold text-lg text-[#94A3B8] border-b  border-gray-800">
        Welcome Back,{" "}
        <span className="text-[#15399f] capitalize">
          {auth.user?.data?.fullName}!
        </span>{" "}
        Securely Manage Your Funds
      </h2>
      <div className=" lg:max-h-[84vh] portfolio overflow-y-auto">
        <Table className=" w-full border-b relative">
          <TableHeader className="sticky top-0">
            <TableRow className="bg-[#020817] border-b  border-gray-800 ">
              <TableHead className="text-center px-4 py-2 font-bold text-sm">
                DATE
              </TableHead>
              <TableHead className="text-center px-4 py-2 font-bold text-sm">
                METHOD
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                AMOUNT
              </TableHead>
              <TableHead className="text-center px-4 py-4 font-bold text-sm">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="portfolio" size={10}>
            {withdrawal.history.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="text-center px-5 py-4 text-xs w-[15vw]">
                  <p>
                    {item.date.toString().split("T")[0]} at <br />
                    <span className="text-[#15399f]">
                      {item.date.toString().split("T")[1]}
                    </span>
                  </p>
                  {/* <p className="text-muted-foreground">12:30:12</p> */}
                </TableCell>
                <TableCell className="text-center px-5 py-4 text-xs">
                  Bank
                </TableCell>
                <TableCell className="text-center px-4 py-4  text-xs">
                  ${item.amount}
                </TableCell>
                <TableCell className="text-center px-4 py-4  text-xs">
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
  return <div>Withdrawal</div>;
}

export default Withdrawal;
