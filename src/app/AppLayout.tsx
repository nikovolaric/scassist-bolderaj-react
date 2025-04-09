import { Outlet, useLocation } from "react-router";
import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useAppDispatch } from "./hooks";
import { clearClassData } from "../features/dashboard/classes/slices/classCartSlice";

function AppLayout() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      window.scrollTo(0, 0);

      if (!pathname.startsWith("/dashboard/classes/")) {
        dispatch(clearClassData());
      }
    },
    [pathname, dispatch],
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

export default AppLayout;
