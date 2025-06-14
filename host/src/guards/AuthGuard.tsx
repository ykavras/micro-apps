import React from "react";
import { Navigate } from "react-router";
//
import useAuthStore from "StoreApp/stores/auth";

export default function AuthGuard(props: React.PropsWithChildren) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  return <>{props.children}</>;
}
