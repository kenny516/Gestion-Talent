"use client"
import NotificationsPage from "@/components/front-office/notification";
import React, { useEffect } from "react";
function useCheckSessionId() {

  useEffect(() => {
    const candidatId = sessionStorage.getItem("candidat_id");

    if (!candidatId) {
        window.location.href ="/auth/login";
    }
  }, []);
  return null;
}
export default function Notification() {
  useCheckSessionId();
  return <NotificationsPage />;
}
