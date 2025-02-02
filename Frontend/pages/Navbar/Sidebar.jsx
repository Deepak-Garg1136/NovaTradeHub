import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { logout } from "@/State/Auth/Action";
import {
  ActivityLogIcon,
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  BookMarkedIcon,
  CreditCardIcon,
  LandmarkIcon,
  WalletIcon,
} from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(dispatch, navigate));
  };
  const menu = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-10" /> },
    {
      name: "Portfolio",
      path: "/portfolio",
      icon: <DashboardIcon className="h-6 w-6" />,
    },
    {
      name: "Watchlist",
      path: "/watchlist",
      icon: <BookMarkedIcon className="h-6 w-6" />,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: <ActivityLogIcon className="h-6 w-6" />,
    },
    {
      name: "Wallet",
      path: "/wallet",
      icon: <WalletIcon className="h-6 w-6" />,
    },
    {
      name: "Payment Details",
      path: "/payment-details",
      icon: <LandmarkIcon className="h-6 w-6" />,
    },
    {
      name: "Withdrawal",
      path: "/withdrawal",
      icon: <CreditCardIcon className="h-6 w-6" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <PersonIcon className="h-6 w-6" />,
    },
    { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="space-y-8">
      {menu.map((item) => (
        <div key={item.name} className="flex items-center">
          <SheetClose className="w-full">
            <Button
              variant="ghost"
              className="flex space-x-4 px-4 py-3 rounded-lg hover:bg-muted transition duration-200 w-full justify-start items-center"
              onClick={() => {
                navigate(item.path);
                if (item.name == "Logout") {
                  handleLogout();
                }
              }}
            >
              <span className="text-foreground" id="icons">
                {item.icon}
              </span>
              <span className="text-base font-medium text-foreground">
                {item.name}
              </span>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
