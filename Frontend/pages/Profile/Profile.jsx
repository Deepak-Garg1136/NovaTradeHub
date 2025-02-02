import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerifiedIcon } from "lucide-react";
import React from "react";
import AccountVerificationForm from "../Portfolio/AccountVerificationForm";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { store } from "@/State/Store";
function Profile() {
  const { auth } = useSelector((store) => store);
  const handleEnableTwoStepVerfication = () => {
    console.log("Verified");
  };
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center text-[#15399f]">
              Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email :</p>
                  <p className="text-gray-500">{auth.user?.data?.email}</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Full Name :</p>
                  <p className="text-gray-500">{auth.user?.data?.fullName}</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Date of Birth :</p>
                  <p className="text-gray-500">2/06/2024</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Nationality :</p>
                  <p className="text-gray-500">Indian</p>
                </div>
              </div>

              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address :</p>
                  <p className="text-gray-500">Haryana</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">City :</p>
                  <p className="text-gray-500">Rohtak</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Postcode :</p>
                  <p className="text-gray-500">124001</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Country :</p>
                  <p className="text-gray-500">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {true ? (
                  <Badge
                    className={
                      "space-x-2 text-white bg-green-700 hover:bg-green-700 text-base py-1"
                    }
                  >
                    <VerifiedIcon />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-pink-800 hover:bg-pink-800 text-base py-1">
                    Disabled
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button className="font-semibold">
                      Enable Two Step Verfication
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className=" text-[#15399f]">
                        Verify your Account
                      </DialogTitle>
                      <AccountVerificationForm
                        handleSubmit={handleEnableTwoStepVerfication}
                      />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
