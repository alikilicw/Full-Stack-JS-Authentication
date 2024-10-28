"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button1 from "@/components/buttons/button-1";
import { useRouter } from "next/navigation";
import Popup from "@/components/auth-popup";

type FormData = {
  username: string;
  password: string;
};

const login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setResponseMessage(result.message);
      setLoginSuccess(true);

      console.log(result);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) setResponseMessage(error.message);
      else console.log("ERRRRRIIROR", error);
    } finally {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  return (
    <div className="flex bg-slate-950 items-center justify-center h-screen">
      <div className="flex flex-col items-start justify-center bg-slate-900 px-5 py-4 rounded-md  w-96">
        <span className="py-3 text-slate-200 text-xl font-semibold">Login</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center mt-4 w-full"
        >
          <input
            required
            type="text"
            placeholder="Username"
            name="username"
            className="p-2 rounded-md outline-none text-slate-950 w-full"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Password"
            name="password"
            className="p-2 rounded-md outline-none text-slate-950 w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <Button1 />
          <p className="text-slate-200 font-normal text-sm underline">
            <Link href="register">You don't have an account?</Link>
          </p>
        </form>

        <Popup
          message={responseMessage}
          isVisible={showPopup}
          textColor={loginSuccess ? "text-green-600" : "text-red-600"}
        />
      </div>
    </div>
  );
};

export default login;
