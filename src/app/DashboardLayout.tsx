import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Outlet, useLocation, useParams } from "react-router";
import { useAppDispatch } from "./hooks";
import { clearPayment } from "../features/dashboard/payments/slices/paymentSlice";
import { clearTicketData } from "../features/dashboard/tickets/slices/ticketCartSlice";
import { clearClassData } from "../features/dashboard/classes/slices/classCartSlice";
import Footer from "../components/Footer";
import { clearGiftData } from "../features/dashboard/gifts/slices/giftSlice";

function DashboardLayout() {
  const { childId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      if (!pathname.includes("/ticketcart")) {
        dispatch(clearPayment());
        dispatch(clearTicketData());
      }
      if (
        !pathname.includes("/classes/") &&
        !pathname.includes("/dashboard/")
      ) {
        dispatch(clearClassData());
      }
      if (pathname === "/dashboard/classes") {
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

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
      <Footer />
    </Suspense>
  );
}

export default DashboardLayout;
