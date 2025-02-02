import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/State/Store";
import { getPaymentDetails } from "@/State/Withdrawal/Action";

function PaymentDetails() {
  const { withdrawal } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="px-20">
      <h1 className="text-2xl font-bold py-10 text-center">Payment Details</h1>
      {withdrawal?.PaymentDetails ? (
        <Card>
          <CardHeader>
            <CardTitle>{withdrawal?.PaymentDetails?.bankName}</CardTitle>
            <CardDescription>
              A/C No: **** **** ****{" "}
              {withdrawal?.PaymentDetails?.accountNumber % 10000}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32 text-sm">A/C Holder:</p>
              <p className="text-gray-400 text-sm">
                {withdrawal?.PaymentDetails?.accountHolderName}
              </p>
            </div>
            <div className="flex items-center mt-1">
              <p className="w-32 text-sm">IFSC Code:</p>
              <p className="text-gray-400 text-sm">
                {withdrawal?.PaymentDetails?.ifsc}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger className="flex justify-center w-full">
            <Button className="py-6 font-semibold ">Add Payment Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base text-center text-[#15399f]">
                Payment Details
              </DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default PaymentDetails;
