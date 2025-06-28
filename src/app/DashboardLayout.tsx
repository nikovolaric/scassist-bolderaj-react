import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/userAPI";
import { useAppDispatch } from "./hooks";
import { clearPayment } from "../features/dashboard/payments/slices/paymentSlice";
import { clearTicketData } from "../features/dashboard/tickets/slices/ticketCartSlice";
import { clearClassData } from "../features/dashboard/classes/slices/classCartSlice";
import Footer from "../components/Footer";
import { clearGiftData } from "../features/dashboard/gifts/slices/giftSlice";

function DashboardLayout() {
  const navigate = useNavigate();
  const { childId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(
    function () {
      if (!pathname.includes("/ticketcart")) {
        dispatch(clearPayment());
        dispatch(clearTicketData());
      }
      if (
        !pathname.includes("/classes/") ||
        !pathname.includes("/dashboard/")
      ) {
        dispatch(clearClassData());
      }
      if (!pathname.includes("/giftcart")) {
        dispatch(clearGiftData());
      }
      if (pathname === "/dashboard") {
        localStorage.clear();
      }
    },
    [childId, pathname, dispatch],
  );

  if (isPending) {
    return <Spinner />;
  }

  if (data instanceof Error) {
    navigate("/");
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
      <Footer />
    </Suspense>
  );
}

export default DashboardLayout;
