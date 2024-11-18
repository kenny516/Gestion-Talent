"use client"
import NotificationsPage from "@/components/front-office/notification";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
function useCheckSessionId() {
  const router = useRouter();

  useEffect(() => {
    const candidatId = sessionStorage.getItem("candidat_id");

    if (!candidatId) {
      router.push("/auth/login");
    }
  }, [router]);
  return null;
}
export default function Notification() {
  useCheckSessionId();
  return <NotificationsPage />;
}
