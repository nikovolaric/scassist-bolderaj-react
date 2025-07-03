import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createSession } from "../../../../services/paymentAPI";
import { useAppSelector } from "../../../../app/hooks";
import { getPaymentData } from "../slices/paymentSlice";
import { useLocation } from "react-router";
import { getTicketCart } from "../../tickets/slices/ticketCartSlice";
import { getGiftCart } from "../../gifts/slices/giftSlice";

function PaymentForm() {
  const { pathname } = useLocation();
  const paymentData = useAppSelector(getPaymentData);
  const ticketCart = useAppSelector(getTicketCart);
  const giftCart = useAppSelector(getGiftCart);
  const { data, isPending } = useQuery({
    queryKey: ["checkoutData", paymentData.amount],
    queryFn: () => createSession(paymentData.amount),
    enabled: !!paymentData.amount,
  });

  useEffect(() => {
    if (!isPending && data?.data?.id) {
      const widgetScript = document.createElement("script");
      widgetScript.src = `${import.meta.env.VITE_HOBEX_URL}v1/paymentWidgets.js?checkoutId=${data.data.id}`;
      widgetScript.crossOrigin = "anonymous";
      widgetScript.integrity = data.data.integrity;

      if (ticketCart.company) {
        localStorage.setItem("company", JSON.stringify(ticketCart.company));
      }

      document.body.appendChild(widgetScript);

      return () => {
        document.body.removeChild(widgetScript);
      };
    }
  }, [data, isPending, ticketCart, giftCart]);

  return (
    <form
      action={`${import.meta.env.VITE_FRONTEND_URL}${pathname}/success`}
      className="paymentWidgets"
      data-brands="VISA MASTER"
    ></form>
  );
}

export default PaymentForm;
