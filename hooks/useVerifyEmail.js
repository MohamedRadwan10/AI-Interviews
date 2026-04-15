"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";

export const useVerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  useEffect(() => {
    const confirmEmail = async () => {
      console.log("Starting verification with:", { userId, token });
      
      if (!userId || !token) {
        console.warn("Missing userId or token in URL query params.");
        setStatus("error");
        setError("Missing verification details.");
        return;
      }

      try {
        const config = AUTH_ENDPOINTS.verifyEmail;
        const response = await axios({
          method: config.method,
          url: `${API_BASE_URL}${config.url}`,
          params: { userId, token }
        });
        
        console.log("Verification successful:", response.data);
        setStatus("success");
        
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 2000);
        
      } catch (err) {
        console.error("Verification API failed:", err.response?.data || err.message);
        setStatus("error");
        setError(err.response?.data?.message || "Verification failed. The link may be expired.");
      }
    };

    confirmEmail();
  }, [userId, token, router]);

  return { status, error, userId, token };
};
