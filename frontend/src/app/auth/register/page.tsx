"use client";

import Popup from "@/components/auth-popup";
import Button1 from "@/components/buttons/button-1";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FormData = {
  username: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  passwordConfirm?: string;
};

const register = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    passwordConfirm: "",
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
      if (formData.password != formData.passwordConfirm)
        throw new Error("Password and password confirm are not equal.");

      const { passwordConfirm, ...restOfFormData } = formData;

      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restOfFormData),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setResponseMessage(result.message);
      setRegisterSuccess(true);

      console.log(result);
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
      <div className="flex flex-col items-start justify-center bg-slate-900 px-5 py-4 rounded-md w-96">
        <span className="py-3 text-slate-200 text-xl font-semibold">
          Register
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center mt-4 w-full"
        >
          <input
            required
            type="text"
            placeholder="Username"
            name="username"
            className="p-2 rounded-md outline-none text-slate-800 w-full"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            className="p-2 rounded-md outline-none text-slate-800 w-full"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Phone"
            name="phone"
            className="p-2 rounded-md outline-none text-slate-800 w-full"
            value={formData.phone}
            onChange={handleChange}
          />
          <select
            required
            name="gender"
            className="p-2 rounded-md outline-none text-slate-800 w-full"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Not Prefer to Say</option>
          </select>
          <input
            required
            type="text"
            placeholder="Password"
            name="password"
            className="p-2 rounded-md outline-none text-slate-800 w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Password Confirm"
            name="passwordConfirm"
            className="p-2 rounded-md outline-none text-slate-800 w-full"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          <Button1 />
          <p className="text-slate-200 font-normal text-sm underline">
            <Link href="login">You already have an account?</Link>
          </p>
        </form>

        <Popup
          message={responseMessage}
          isVisible={showPopup}
          textColor={registerSuccess ? "text-green-600" : "text-red-600"}
        />
      </div>
    </div>
  );
};

export default register;
