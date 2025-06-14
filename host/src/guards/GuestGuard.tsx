import React from "react";
import { Navigate } from "react-router";
//
import useAuthStore from "StoreApp/stores/auth";

type AuthGuardProps = { children: React.ReactNode };

export default function GuestGuard(props: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <>{props.children}</>;
}
