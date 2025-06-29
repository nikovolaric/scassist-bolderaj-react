import { useQuery } from "@tanstack/react-query";
import { buyGiftOnline, getOneArticle } from "../../services/articlesAPI";
import { getGiftCart } from "../../features/dashboard/gifts/slices/giftSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { setAmount } from "../../features/dashboard/payments/slices/paymentSlice";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import CompanyInvoiceForm from "../../features/dashboard/payments/components/CompanyInvoiceForm";
import PaymentForm from "../../features/dashboard/payments/components/PaymentForm";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getTicketCart } from "../../features/dashboard/tickets/slices/ticketCartSlice";

function GiftCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const giftCart = useAppSelector(getGiftCart);
  const ticketCart = useAppSelector(getTicketCart);
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
            ).toFixed(2),
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
        <PaymentType
          amount={(
            data.article.priceDDV * Number(giftCart.articles[0].quantity)
          ).toFixed(2)}
          articles={giftCart.articles}
          company={ticketCart.company}
        />
      </div>
    </div>
  );
}

function PaymentType({
  amount,
  articles,
  company,
}: {
  amount: string;
  articles: {
    articleId: string;
    quantity: string;
  }[];
  company?: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    taxNumber: string;
  };
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [payment, setPayment] = useState("");

  return (
    <>
      <p className="mt-10 font-medium lg:mt-16">
        Izberi način plačila in dokončaj nakup
      </p>
      <div className="mt-2 flex flex-col gap-8 rounded-xl bg-white px-4 py-6 md:px-8 lg:pb-10">
        <p className="font-semibold">Znesek želim poravnati:</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value=""
                onChange={(e) => setPayment(e.target.value)}
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={
                    payment === ""
                      ? `bg-primary border-gray h-4 w-4 rounded-full border`
                      : ""
                  }
                />
              </div>
            </label>
            <p className="font-medium">s plačilno kartico</p>
          </div>
          <PaymentForm />
        </div>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="peer hidden"
              value="paypal"
              onChange={(e) => setPayment(e.target.value)}
            />
            <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
              <span
                className={
                  payment === "paypal"
                    ? `bg-primary border-gray h-4 w-4 rounded-full border`
                    : ""
                }
              />
            </div>
          </label>
          <p className="font-medium">s PayPal-om</p>
        </div>
        {payment === "paypal" && (
          <div className="lg:mx-auto lg:w-1/2">
            <PayPalScriptProvider
              options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
                currency: "EUR",
                disableFunding: "card",
                enableFunding: "applepay",
              }}
            >
              <PayPalButtons
                createOrder={(_, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "EUR",
                          value: amount,
                        },
                      },
                    ],
                    intent: "CAPTURE",
                  });
                }}
                onApprove={async (_, actions) => {
                  await actions.order?.capture();

                  await buyGiftOnline({
                    articles,
                    company,
                    paymentMethod: "paypal",
                  });

                  localStorage.removeItem("articles");
                  localStorage.removeItem("company");

                  navigate(`${pathname}/success`);
                }}
                onCancel={() => {
                  navigate(pathname);
                }}
                onError={(err) => {
                  console.error("Napaka pri plačilu:", err);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
      <p className="mt-10 flex gap-4">
        <span className="from-primary to-secondary drop-shadow-btn flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
          i
        </span>
        Nakup darilnega bona v spletni aplikaciji je možno izvršiti samo s
        spletnim plačilom. V kolikor želiš darilni bon kupiti z gotovino ali
        plačilno kartico, lahko to opraviš v času delovnih ur na blagajni
        recepcije.
      </p>
    </>
  );
}

export default GiftCart;
