import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import CartCard from "../features/dashboard/components/CartCard";
import { getTicketCart } from "../features/dashboard/tickets/slices/ticketCartSlice";
import { buyArticlesOnline, getOneArticle } from "../services/articlesAPI";
import Spinner from "../components/Spinner";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PaymentForm from "../features/dashboard/payments/components/PaymentForm";
import {
  getPaymentData,
  setAmount,
} from "../features/dashboard/payments/slices/paymentSlice";

function OnlineCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ticketCart = useAppSelector(getTicketCart);
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(ticketCart[0].articleId),
  });

  useEffect(
    function () {
      if (ticketCart.length === 0) {
        navigate("/dashboard/tickets");
      }
      if (data) {
        dispatch(
          setAmount(
            (data.article.priceDDV * Number(ticketCart[0].quantity)).toString(),
          ),
        );
      }
    },
    [navigate, ticketCart, data, dispatch],
  );

  if (isPending || !data) {
    return <Spinner />;
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <CartCard />
      <div className="flex flex-col gap-6 lg:mx-auto lg:w-2/3">
        <div
          className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-[3fr_2fr] md:items-center xl:grid-cols-[5fr_2fr]`}
        >
          <p className={`font-quicksand text-lg font-bold uppercase`}>
            {data.article.name}
          </p>
          <p className="bg-primary/10 flex items-center justify-between rounded-xl px-4 py-3 md:col-start-2 md:w-full md:justify-self-end">
            Količina:{" "}
            <span className="font-semibold">{ticketCart[0].quantity}</span>
          </p>
          <p className="bg-primary/35 flex items-center justify-between rounded-xl px-4 py-3 md:col-start-2 md:w-full md:justify-self-end">
            Skupaj za plačilo:{" "}
            <span className="font-semibold">
              {(data.article.priceDDV * Number(ticketCart[0].quantity))
                .toFixed(2)
                .replace(".", ",")}{" "}
              €
            </span>
          </p>
        </div>
        <PaymentType />
      </div>
    </div>
  );
}

function PaymentType() {
  const { childId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paymentData = useAppSelector(getPaymentData);
  const ticketCart = useAppSelector(getTicketCart);
  const [error, setError] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: buyArticlesOnline,
    onSuccess: (data) => {
      if (data instanceof Error) {
        setError(
          "Nekaj je šlo narobe! Prosimo, da še enkrat preverite vnešene podatke.",
        );
      } else {
        navigate(`${pathname}/success`);
      }
    },
  });

  function handleClick() {
    if (
      !paymentData.amount ||
      !paymentData.card.number ||
      !paymentData.card.holder ||
      !paymentData.card.cvv ||
      !paymentData.card.expiryMonth ||
      !paymentData.card.expiryYear
    ) {
      setError("Prosim vnesite vse potrebne podatke za plačilo");
      return;
    }
    mutate({ articles: ticketCart, paymentData, id: childId });
  }

  return (
    <>
      <p className="font-medium">Vnesite podatke za spletno plačilo</p>
      <div className="flex flex-col gap-8 rounded-xl bg-white px-4 py-6 md:px-8 lg:pb-10">
        <p className="font-semibold">Znesek želim poravnati:</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input type="checkbox" className="peer hidden" value="" />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`bg-primary h-4 w-4 rounded-full border border-black/75`}
                />
              </div>
            </label>
            <p className="font-medium">S plačilno kartico</p>
          </div>
          <PaymentForm />
          {error && (
            <p className="mx-4 font-medium text-red-500 lg:mx-auto lg:w-3/4">
              {error}
            </p>
          )}
        </div>
      </div>
      <p className="flex gap-4">
        <span className="from-primary to-secondary drop-shadow-btn flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
          i
        </span>
        Nakup vstopnice v spletni aplikaciji je možno izvršiti samo s spletnim
        plačilom. V kolikor želite vstopnico kupiti z gotovino, lahko to
        opravite v času delovnih ur na blagajni recepcije.
      </p>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:from-gray disabled:to-gray cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          "Postopek je v teku..."
        ) : (
          <p className="flex items-center gap-4">
            Zaključi prijavo
            <ChevronRightIcon className="w-6 stroke-3" />
          </p>
        )}
      </button>
    </>
  );
}

export default OnlineCart;
