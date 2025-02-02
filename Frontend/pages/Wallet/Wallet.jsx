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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  CopyIcon,
  DollarSign,
  DownloadIcon,
  ShuffleIcon,
  UploadIcon,
  WalletIcon,
} from "lucide-react";
import TopUpForm from "./TopUpForm";
import Withdrawal from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  depositeMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/State/Wallet/Action";
import { store } from "@/State/Store";
import { useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(window.location.search);
}
function Wallet() {
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id"); // for stripe
  const razorpayPaymentId = query.get("razorpay_payment_id"); // for razorpay

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransaction();
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositeMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId || paymentId,
          navigate,
        })
      );
    }
  }, [orderId, razorpayPaymentId, paymentId]);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };
  const { wallet } = useSelector((store) => store);
  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon className="" size={30}></WalletIcon>
                <div>
                  <CardTitle className="text-xl">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className=" text-sm text-muted-foreground">
                      #{wallet.userWallet?.id}
                    </p>
                    <CopyIcon
                      size={12}
                      className="cursor-pointer text-[#15399f] hover:text-[#423cf8f7]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon
                  onClick={handleFetchUserWallet}
                  className="w-6 h-6 cursor-pointer hover:text-gray-400"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex ">
              <DollarSign />
              <span className="text-xl font-semibold">
                {wallet?.userWallet?.balance}
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-28 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className=" text-base text-center text-[#15399f]">
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-28 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <DownloadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className=" text-base text-center text-[#15399f]">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <Withdrawal />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-28 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className=" text-base text-center text-[#15399f]">
                      Transfer to other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-xl font-semibold">History</h1>
            <UpdateIcon
              className="h-6 w-6 p-0 cursor-pointer hover:text-gray-400"
              onClick={() => handleFetchWalletTransaction()}
            ></UpdateIcon>
          </div>

          <div className="space-y-5 lg:max-h-[36vh] overflow-y-auto transactions ">
            {wallet?.transactions?.map((item, index) => (
              <div key={item.id}>
                <Card className=" px-5 flex justify-between items-center p-2 pl-4 pr-4 ">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="flex items-center">
                        <ShuffleIcon
                          onClick={() => handleFetchWalletTransaction()}
                          className="cursor-pointer"
                        />
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1 className="text-base">
                        {item.walletTransactionType}
                      </h1>
                      <p className="text-xs text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p
                      className={`${
                        ["BUY_ASSET", "WALLET_TRANSFER", "WITHDRAWAL"].includes(
                          item.walletTransactionType
                        )
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.amount} USD
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
