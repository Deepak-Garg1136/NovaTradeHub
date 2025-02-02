import "./App.css";
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio/Portfolio";
import Activity from "./pages/Activity/Activity";
import Wallet from "./pages/Wallet/Wallet";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import PaymentDetails from "./pages/PaymentDetails/PaymentDetails";
import StockDetails from "./pages/StockDetails/StockDetails";
import WatchList from "./pages/Watchlist/WatchList";
import Profile from "./pages/Profile/Profile";
import SearchCoin from "./pages/Search/SearchCoin";
import NotFound from "./pages/NotFound/NotFound";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./State/Store";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  // console.log(auth.user);

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (
    <>
      {/* <Auth /> */}
      {auth.user ? (
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
