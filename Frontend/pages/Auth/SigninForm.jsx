import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/State/Auth/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(login({ data, navigate }));

    form.reset();
  };
  return (
    <div className=" pt-8 pb-8">
      <h1 className="text-2xl font-bold pb-9 text-[#15399f] text-center">
        NovaTradeHub
      </h1>
      <h1 className="text-lg font-bold text-center mb-3"> Welcome Back!</h1>
      <h1 className="text-lg font-bold text-center mb-10">
        {" "}
        Log in to access your account
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border w-full border-gray-800 p-5"
                    placeholder="novatradehub@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border w-full border-gray-800 p-5"
                    placeholder="*******"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full py-5 font-bold ">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SigninForm;
