import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Cross2Icon, DotIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  getCoinList,
  getTop50CoinList,
} from "@/State/Coin/Action";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PromptMessage from "../Messages/PromptMessage";
import ResponseMessage from "../Messages/ResponseMessage";
import axios from "axios";

// Format we are going to store the responses
// [
//   { message: "prompt", role: "user" },
//   { message: "response", role: "model" },
// ];
function Home() {
  const [category, setCategory] = useState("all");
  const [showBot, setShowBot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { coin, auth } = useSelector((store) => store);

  const inputValue = useRef();
  const chatBotRef = useRef();

  useEffect(() => {
    dispatch(
      fetchCoinDetails({ coinId: "bitcoin", jwt: localStorage.getItem("jwt") })
    );
  }, []);

  useEffect(() => {
    dispatch(getCoinList(page));
  }, [page]);

  useEffect(() => {
    dispatch(getTop50CoinList());
  }, [category]);

  const handleCategory = (value) => {
    setCategory(value);
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      const userPrompt = { message: inputValue.current.value, role: "user" };
      setResponses((prevResponses) => [...prevResponses, userPrompt]);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/chat`,
          { prompt: inputValue.current.value },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        const response = { message: data.message, role: "model", error: "" };
        // const userPrompt1 = { message: inputValue.current.value, role: "user" };

        setResponses((prevResponses) => [
          ...prevResponses,
          // userPrompt1,
          response,
        ]);
        console.log(data);
      } catch (error) {
        const response = {
          message: "",
          error: "Failed to fetch",
          role: "model",
        };

        setResponses((prevResponses) => [...prevResponses, response]);
        console.error(error);
      }
      setLoading(false);
    }
    // inputValue.current.value = "";
  };

  const handleShowBot = () => {
    setShowBot(!showBot);
    inputValue.current.value = "";
  };

  useGSAP(() => {
    if (showBot) {
      gsap.to(chatBotRef.current, { translateX: "0%" });
    } else {
      gsap.to(chatBotRef.current, { translateX: "110%" });
    }
  }, [showBot]);

  return (
    <div className="relative overflow-hidden">
      <div className="lg:flex" onClick={() => setShowBot(false)}>
        <div className="lg:w-[50%] lg:border-r  lg:border-gray-800">
          <div className="py-2 px-2 space-x-5">
            <Button
              onClick={() => handleCategory("all")}
              variant={category == "all" ? "default" : "outline"}
              className={
                category == "all" ? "rounded-full h-10" : "rounded-full h-9"
              }
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")}
              variant={category == "top50" ? "default" : "outline"}
              className={
                category == "top50" ? "rounded-full h-10" : "rounded-full h-9"
              }
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category == "topGainers" ? "default" : "outline"}
              className={
                category == "topGainers"
                  ? "rounded-full h-10"
                  : "rounded-full h-9"
              }
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category == "topLosers" ? "default" : "outline"}
              className={
                category == "topLosers"
                  ? "rounded-full h-10"
                  : "rounded-full h-9"
              }
            >
              Top Losers
            </Button>
          </div>
          <div
            className={` ${
              category == "all" ? "max-h-[82vh]" : "max-h-[79vh]"
            } overflow-y-auto home_asset_table`}
          >
            <AssetTable
              coin={category == "all" ? coin.coinList : coin.top50}
              category={category}
            />
          </div>
          <div className="mt-[0.11rem]">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(2)}>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[50%] lg:pl-1 pt-2 ">
          <StockChart coinId={"bitcoin"} />
          <div className="flex gap-4 items-center justify-start pl-3 pt-3">
            <div>
              <Avatar>
                <AvatarImage src={coin.coinDetails?.image.large}></AvatarImage>
              </Avatar>
            </div>
            <div>
              <div className="flex gap-2 items-center justify-start">
                <p className="text-sm">
                  {coin.coinDetails?.symbol.toUpperCase()}
                </p>
                <DotIcon className="text-muted"></DotIcon>
                <p className="text-sm text-muted-foreground">
                  {coin.coinDetails?.name}
                </p>
              </div>
              <div className="flex gap-2 items-center justify-start">
                <p className="">
                  {" "}
                  ${coin.coinDetails?.market_data?.current_price?.usd}
                </p>
                <p
                  className={`text-xs ${
                    coin.coinDetails?.market_data?.market_cap_change_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  <span>
                    {coin.coinDetails?.market_data?.market_cap_change_24h}
                  </span>
                  <span>
                    {" "}
                    (
                    {
                      coin.coinDetails?.market_data
                        ?.market_cap_change_percentage_24h
                    }
                    %)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="absolute bottom-3 right-5 flex flex-col justify-end items-end gap-2 z-40">
        <div
          className="rounded-md w-[20rem] md:w-[25rem] lg:w=[25rem] h-[70vh] bg-[#02081799] -translate-x-[-110%]"
          ref={chatBotRef}
        >
          <div className="flex justify-between items-center border-b px-6 h-[12%]">
            <p>Chat Bot</p>
            <Button variant="ghost" size="icon" onClick={() => handleShowBot()}>
              <Cross2Icon />
            </Button>
          </div>
          <div className="flex flex-col gap-5 h-[76%] px-5 py-2 scroll-container overflow-y-auto chatBot_mid_section">
            <div className="self-start w-auto pb-5">
              <div className="justify-end self-end px-5 py-2 rounded-md w-auto bg-[#0A1F2C] text-xs">
                <p>Hi, {auth.user?.data?.fullName}</p>
                <p>you can ask crypto related any question</p>
                <p>like price, market cap etc.....</p>
              </div>
            </div>

            {responses.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.role == "user" ? "self-end" : "self-start"
                } "w-auto pb-5"`}
              >
                {item.role == "user" ? (
                  <div>
                    <PromptMessage message={item.message} />
                  </div>
                ) : (
                  <div>
                    <ResponseMessage
                      message={item.message}
                      error={item.error}
                    />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <p className="justify-end self-start px-5 py-2 rounded-md w-auto bg-[#0A1F2C] text-xs">
                Fetching data...
              </p>
            )}
          </div>
          <div className="h-[12%] border-t">
            <Input
              id=""
              className="w-full h-full border-none outline-none prompt focus:outline-none"
              placeholder="write prompt"
              ref={inputValue}
              onKeyPress={(e) => handleKeyPress(e)}
            ></Input>
          </div>
        </div>

        <div className="relative w-[10rem] cursor-pointer group ">
          <Button
            className="w-full h-[2.5rem] gap-2 items-center rounded-lg bg-[#3576DF]"
            onClick={() => handleShowBot()}
          >
            <MessageCircle
              className="fill-[#020817] -rotate-90 stroke-none group-hover:fill-[#020817] w-8 h-8"
              id="Ref"
            />
            <span className="text-xl">Chat Bot</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
