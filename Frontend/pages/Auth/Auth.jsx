import React from "react";
import "./Auth.css";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";
function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="h-screen relative authContainer">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50">
        <div className="bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-[#15399f] px-10">
          {location.pathname == "/signup" ? (
            <section className="w-full">
              <SignupForm />
              <div className="flex items-center justify-center mb-8">
                <span>Already have an Account !</span>
                <Button variant="link" onClick={() => navigate("/signin")}>
                  Signin
                </Button>
              </div>
            </section>
          ) : location.pathname == "/forgot-password" ? (
            <section className="w-full">
              <ForgotPasswordForm />
              <div className="flex items-center justify-center mt-2 mb-7">
                <span>Back to Login !</span>
                <Button variant="link" onClick={() => navigate("/signin")}>
                  Signin
                </Button>
              </div>
            </section>
          ) : (
            <section className="w-full">
              <SigninForm />
              <div className="flex items-center justify-center ">
                <span>Don't have an Account ?</span>
                <Button
                  variant="link"
                  onClick={() => navigate("/signup")}
                  className="font-bold"
                >
                  Signup
                </Button>
              </div>

              <div className="mt-7 mb-8 ">
                <Button
                  className="w-full py-5"
                  variant="outline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
