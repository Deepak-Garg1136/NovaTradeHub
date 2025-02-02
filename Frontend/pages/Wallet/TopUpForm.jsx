import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { paymentHandler } from "@/State/Wallet/Action";

function TopUpForm() {
  const amountRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const dispatch = useDispatch();
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleSubmit = (value) => {
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount: amountRef.current.value,
      })
    );
  };
  return (
    <div className="pt-5 space-y-5">
      <div>
        <h1 className="pb-2"> Enter Amount</h1>
        <Input
          className="py-5 text-lg"
          placeholder="$9999"
          ref={amountRef}
          type="number"
        />
      </div>

      <div>
        <h1 className="pb-2 pt-2">Select Payment Method</h1>
        <RadioGroup
          onValueChange={(value) => handlePaymentMethodChange(value)}
          className="flex justify-between pt-2"
          defaultValue="RAZORPAY"
        >
          <div className="flex items-center space-x-2  px-5 rounded-md ">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1" className="text-base">
              Razorpay
            </Label>
          </div>

          <div className="flex items-center space-x-2  px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2" className="text-base">
              Stripe
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="pt-2">
        <Button
          onClick={() => handleSubmit()}
          className="w-full text-lg py-6 font-bold"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default TopUpForm;
