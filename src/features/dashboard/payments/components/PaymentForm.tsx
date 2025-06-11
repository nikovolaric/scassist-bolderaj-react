import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createSession } from "../../../../services/paymentAPI";
import { useAppSelector } from "../../../../app/hooks";
import { getPaymentData } from "../slices/paymentSlice";
import { useLocation } from "react-router";
import { getTicketCart } from "../../tickets/slices/ticketCartSlice";
import { getGiftCart } from "../../gifts/slices/giftSlice";
// import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
// import {
//   getPaymentData,
//   setCVV,
//   setExpiry,
//   setHolder,
//   setNumber,
// } from "../slices/paymentSlice";

// function detectCardType(number: string) {
//   const noSpaces = number.replace(/\s/g, "");

//   if (/^4/.test(noSpaces)) return "visa";
//   if (/^5[1-5]/.test(noSpaces)) return "mastercard";
//   if (/^3[47]/.test(noSpaces)) return "amex";
//   return "unknown";
// }

// function PaymentForm() {
//   const [cardType, setCardType] = useState("unknown");
//   const dispatch = useAppDispatch();
//   const paymentData = useAppSelector(getPaymentData);

//   return (
//     <form className="mx-4 flex flex-col gap-8 md:flex-row lg:mx-auto lg:w-4/5 xl:w-3/4">
//       <div className="flex flex-col gap-4 md:w-72 lg:w-80">
//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">Imetnik kartice</label>
//           <input
//             type="text"
//             placeholder="Janez Novak"
//             className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
//             required
//             onChange={(e) => dispatch(setHolder(e.target.value))}
//           />
//         </div>
//         <div className="relative flex flex-col gap-1">
//           <label className="text-sm font-medium">Številka kartice</label>
//           <input
//             type="text"
//             placeholder="0000 0000 0000 0000"
//             className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
//             required
//             onChange={(e) => {
//               let value = e.target.value.replace(/\D/g, "");
//               if (value.length > 16) value = value.slice(0, 16);
//               const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
//               dispatch(setNumber(formatted));
//               e.target.value = formatted;
//               setCardType(detectCardType(value));
//             }}
//           />
//           {cardType !== "unknown" && (
//             <img
//               src={`/icons/${cardType}.svg`} // ali .png, odvisno kaj imaš
//               alt={cardType}
//               className="absolute top-1/2 right-4 h-6"
//             />
//           )}
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-x-5 md:flex md:w-32 md:flex-col md:gap-4 lg:w-36">
//         <div className="relative flex flex-col gap-1">
//           <label className="text-sm font-medium">Veljavnost</label>
//           <input
//             type="text"
//             placeholder={`01/${new Date().getFullYear()}`}
//             className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
//             required
//             maxLength={7}
//             onChange={(e) => {
//               let value = e.target.value.replace(/\D/g, "");
//               if (value.length > 1) {
//                 value = value.slice(0, 2) + "/" + value.slice(2);
//               }
//               if (value.length > 7) value = value.slice(0, 7);
//               dispatch(setExpiry(value));
//               e.target.value = value;
//             }}
//           />
//           {paymentData.errors.expiryError && (
//             <p className="absolute -bottom-5 text-sm font-medium text-red-500">
//               {paymentData.errors.expiryError}
//             </p>
//           )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium">CVV</label>
//           <input
//             type="password"
//             placeholder="●●●"
//             className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
//             required
//             onChange={(e) => dispatch(setCVV(e.target.value))}
//             maxLength={4}
//             autoComplete="off"
//           />
//         </div>
//       </div>
//     </form>
//   );
// }

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
      widgetScript.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${data.data.id}`;
      widgetScript.crossOrigin = "anonymous";
      widgetScript.integrity = data.data.integrity;

      if (ticketCart.articles.length > 0) {
        localStorage.setItem("articles", JSON.stringify(ticketCart.articles));
      }

      if (ticketCart.company) {
        localStorage.setItem("company", JSON.stringify(ticketCart.company));
      }

      if (giftCart.articles) {
        localStorage.setItem("articles", JSON.stringify(giftCart.articles));
      }

      document.body.appendChild(widgetScript);

      return () => {
        document.body.removeChild(widgetScript);
      };
    }
  }, [data, isPending, ticketCart, giftCart]);

  return (
    <form
      action={`http://localhost:5173${pathname}/success`}
      className="paymentWidgets"
      data-brands="VISA MASTER"
    ></form>
  );
}

export default PaymentForm;
