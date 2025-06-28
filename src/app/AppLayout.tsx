import { Navigate, Outlet, useLocation } from "react-router";
import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { getMe } from "../services/userAPI";
import { useQuery } from "@tanstack/react-query";

function AppLayout() {
  const { pathname } = useLocation();
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [pathname],
  );

  if (isPending) {
    return <Spinner />;
  }

  if (data.firstName) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

export default AppLayout;
