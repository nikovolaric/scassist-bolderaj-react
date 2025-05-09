import { useMutation, useQuery } from "@tanstack/react-query";
import { buyGiftOnline, getOneArticle } from "../../services/articlesAPI";
import { getGiftCart } from "../../features/dashboard/gifts/slices/giftSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  getPaymentData,
  setAmount,
} from "../../features/dashboard/payments/slices/paymentSlice";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import CompanyInvoiceForm from "../../features/dashboard/payments/components/CompanyInvoiceForm";
import { getTicketCart } from "../../features/dashboard/tickets/slices/ticketCartSlice";
import PaymentForm from "../../features/dashboard/payments/components/PaymentForm";

function GiftCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const giftCart = useAppSelector(getGiftCart);
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(giftCart.articles[0].articleId),
  });

  useEffect(
    function () {
      if (giftCart.articles.length === 0) {
        navigate("/dashboard/gifts/pickage");
      }
      if (data) {
        dispatch(
          setAmount(
            (
              data.article.priceDDV * Number(giftCart.articles[0].quantity)
            ).toString(),
          ),
        );
      }
    },
    [navigate, giftCart, data, dispatch],
  );

  if (isPending || !data) {
    return <Spinner />;
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div>
        <h1 className="flex items-center gap-4 font-semibold">
          <Link to="/dashboard/gifts/pickage">Plezanje kot darilo</Link>
          <ChevronRightIcon className="w-4 stroke-3" /> Plačilo
        </h1>
      </div>
      <div className="flex flex-col lg:mx-auto lg:w-2/3">
        <p className="font-medium">Povzetek nakupa</p>
        <div
          className={`mt-2 flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-[3fr_2fr] md:items-center md:px-8 xl:grid-cols-[5fr_2fr]`}
        >
          <p className={`font-quicksand text-lg font-bold uppercase`}>
            {data.article.name.sl}
          </p>
          <p className="bg-primary/10 flex items-center justify-between rounded-xl px-4 py-3 md:col-start-2 md:w-full md:justify-self-end">
            Količina:{" "}
            <span className="font-semibold">
              {giftCart.articles[0].quantity}
            </span>
          </p>
          <p className="bg-primary/35 flex items-center justify-between rounded-xl px-4 py-3 md:col-start-2 md:w-full md:justify-self-end">
            Skupaj za plačilo:{" "}
            <span className="font-semibold">
              {(data.article.priceDDV * Number(giftCart.articles[0].quantity))
                .toFixed(2)
                .replace(".", ",")}{" "}
              €
            </span>
          </p>
        </div>
        <div className="mt- mt-10 flex flex-col gap-8 rounded-xl bg-white px-4 py-6 md:px-8 lg:mt-16 lg:py-10">
          <CompanyInvoiceForm />
        </div>
        <PaymentType />
      </div>
    </div>
  );
}

function PaymentType() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paymentData = useAppSelector(getPaymentData);
  const giftCart = useAppSelector(getGiftCart);
  const ticketCart = useAppSelector(getTicketCart);
  const [error, setError] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: buyGiftOnline,
    onSuccess: (data) => {
      if (data instanceof Error) {
        throw data;
      } else {
        navigate(`${pathname}/success`);
      }
    },
    onError: (error) => {
      setError((error as Error).message);
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
    mutate({
      articles: giftCart.articles,
      paymentData,
      company: ticketCart.company,
    });
  }

  return (
    <>
      <p className="mt-10 font-medium lg:mt-16">
        Vnesi podatke za spletno plačilo
      </p>
      <div className="mt-2 flex flex-col gap-8 rounded-xl bg-white px-4 py-6 md:px-8 lg:pb-10">
        <p className="font-semibold">Znesek želim poravnati:</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input type="checkbox" className="peer hidden" value="" />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={`bg-primary border-gray h-4 w-4 rounded-full border`}
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
      <p className="mt-10 flex gap-4">
        <span className="from-primary to-secondary drop-shadow-btn flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
          i
        </span>
        Nakup vstopnice v spletni aplikaciji je možno izvršiti samo s spletnim
        plačilom. V kolikor želiš vstopnico kupiti z gotovino, lahko to opraviš
        v času delovnih ur na blagajni recepcije.
      </p>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:from-gray disabled:to-gray mt-10 cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          "Postopek je v teku..."
        ) : (
          <p className="flex items-center gap-4">
            Zaključi nakup
            <ChevronRightIcon className="w-6 stroke-3" />
          </p>
        )}
      </button>
    </>
  );
}

export default GiftCart;
