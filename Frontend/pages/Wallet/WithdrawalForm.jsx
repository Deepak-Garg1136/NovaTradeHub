import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/State/Store";
import {
  getPaymentDetails,
  withdrawalRequest,
} from "@/State/Withdrawal/Action";
import { useNavigate } from "react-router-dom";
function Withdrawal() {
  const amountRef = useRef();
  const navigate = useNavigate();
  const { withdrawal, wallet } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(
      withdrawalRequest({
        amount: amountRef.current.value,
        jwt: localStorage.getItem("jwt"),
        navigate,
      })
    );
  };

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="pt-5 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-lg font-bold px-5 py-3">
        <p>Available Balance</p>
        <p className="text-[#15399f]">${wallet?.userWallet?.balance}</p>
      </div>
      <div className="flex flex-col items-center pt-2">
        <h1 className="pb-2">Enter amount</h1>
        <div className="flex justify-center items-center">
          <Input
            ref={amountRef}
            className="withdrawalInput py-5  px-0 text-lg text-center"
            placeholder="$9999"
            type="number"
            min="1"
          />
        </div>
      </div>

      <div>
        <p className="pb-2 pt-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2">
          <Avatar>
            <AvatarImage src="https://thumbs.dreamstime.com/b/bank-building-icon-isolated-black-background-bank-building-icon-isolated-black-background-simple-vector-logo-161293296.jpg"></AvatarImage>
          </Avatar>
          <div>
            <p className="text-lg font-bold">
              {withdrawal.PaymentDetails?.bankName}
            </p>
            <p className="text-xs text-muted-foreground">
              **** **** **** {withdrawal?.PaymentDetails?.accountNumber % 10000}
            </p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
        <div className="w-full pt-1">
          <Button
            className="w-full text-lg py-6 font-bold"
            onClick={() => handleSubmit()}
          >
            Withdraw
          </Button>
        </div>
      </DialogClose>
    </div>
  );
}

export default Withdrawal;
