import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import SideBar from "./Sidebar";
import { useSelector } from "react-redux";
import { store } from "@/State/Store";

function Navbar() {
  const { auth } = useSelector((store) => store);
  return (
    <div className="px-4 py-3 border-b bg-background text-foreground z-50 sticky top-0 left-0 right-0 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-11 w-11 hover:bg-muted transition duration-200"
            >
              <DragHandleHorizontalIcon
                id="open"
                className="h-8 w-8 text-muted-foreground"
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="bg-background flex flex-col p-6 w-80 "
            side="left"
          >
            {/* Header with Title and Close Button */}
            <div className="flex justify-between items-center mb-6">
              <SheetTitle className="text-xl font-semibold text-foreground">
                <div className="flex items-center mt-4">
                  <Avatar>
                    <AvatarImage
                      src="https://e7.pngegg.com/pngimages/621/885/png-clipart-billion-logo-bitcoin-cryptocurrency-blockchain-coinbase-litecoin-bitcoin-blue-company.png"
                      className="rounded-full"
                    />
                    <AvatarFallback className="bg-muted text-foreground">
                      N
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <span className="text-xl font-medium text-foreground">
                      Nova
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      TradeHub
                    </span>
                  </div>
                </div>
              </SheetTitle>
              {/* <SheetClose asChild>
                <button
                  className="rounded-full p-2 bg-muted hover:bg-muted-foreground transition duration-200"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </SheetClose> */}
            </div>

            {/* Sidebar */}
            <SideBar />
          </SheetContent>
        </Sheet>

        <p className="text-lg font-semibold">NovaTradeHub</p>
        <div>
          <Button variant="outline" className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <Avatar>
          <AvatarFallback>
            {auth.user?.data?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Navbar;
