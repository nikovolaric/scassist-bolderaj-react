import { Outlet, useLocation, useNavigate } from "react-router";
import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { getMe } from "../services/userAPI";
import { useQuery } from "@tanstack/react-query";

function AppLayout() {
  const navigate = useNavigate();
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
    navigate("/dahsboard");
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

export default AppLayout;
