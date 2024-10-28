"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const confirm = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");

  let loadPage: boolean = false;
  if (userId && code) loadPage = true;

  useEffect(() => {
    if (loadPage) {
      const confirm = async () => {
        const response = await fetch(
          `http://localhost:5000/api/v1/auth/confirm?userId=${userId}&code=${code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setMessageColor("text-red-600");
          setMessage(`Your account could not be confirmed: ${result.message}. You can try register again with the same informations.
                  `);

          setTimeout(() => {
            router.push("register");
          }, 3000);
        } else {
          setMessageColor("text-green-600");
          setMessage(`Confirmation is successfull!`);

          setTimeout(() => {
            router.push("login");
          }, 3000);
        }
      };
      confirm();
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        className={`border-slate-200 border-2 rounded-md p-5 mt-5 font-medium text-lg ${messageColor}`}
      >
        {message}
      </div>
    </div>
  );
};

export default confirm;
