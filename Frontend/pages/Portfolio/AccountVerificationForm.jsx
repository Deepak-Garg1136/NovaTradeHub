import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DialogClose } from "@radix-ui/react-dialog";

function AccountVerificationForm() {
  const OTPref = useRef();

  const handleSubmit = () => {
    console.log(OTPref.current.value);
  };
  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-5 w-full">
        <div className="flex justify-between items-center">
          <p>Email :</p>
          <p>novatradehub@gmail.com</p>
          <Dialog>
            <DialogTrigger>
              <Button className="font-semibold"> Send OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className=" text-[#15399f]">Enter OTP</DialogTitle>
              </DialogHeader>
              <div className="py-5 flex gap-10 justify-center items-center">
                <InputOTP maxLength={6} ref={OTPref}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button
                    className="w-[10rem] font-semibold"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default AccountVerificationForm;
