import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { transferMoney } from "@/State/Wallet/Action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
function TransferForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
  };
  return (
    <div className="pt-5 space-y-5">
      <div>
        <h1 className="pb-2">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-5 text-lg"
          placeholder="$9999"
          type="number"
        />
      </div>

      <div>
        <h1 className="pb-2">Wallet Id</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-5 text-lg"
          placeholder="#ADER455"
        />
      </div>

      <div>
        <h1 className="pb-2">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-5 text-lg"
          placeholder="Gift for your friend"
        />
      </div>

      <DialogClose className="w-full">
        <Button
          className="w-full text-lg py-6 font-bold"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogClose>
    </div>
  );
}

export default TransferForm;
