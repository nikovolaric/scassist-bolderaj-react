import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";
import { getTicketCart } from "../../features/dashboard/tickets/slices/ticketCartSlice";
import { buyArticlesOnline, getOneArticle } from "../../services/articlesAPI";
import Spinner from "../../components/Spinner";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import PaymentForm from "../../features/dashboard/payments/components/PaymentForm";
import { setAmount } from "../../features/dashboard/payments/slices/paymentSlice";
import CompanyInvoiceForm from "../../features/dashboard/payments/components/CompanyInvoiceForm";
import { getMyChild } from "../../services/userAPI";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function OnlineCart() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ticketCart = useAppSelector(getTicketCart);
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{
    firstName: string;
    parentOf: unknown[];
  }>(["me"])!;
  const { data: childData } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  });
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(ticketCart.articles[0].articleId),
  });

  useEffect(
    function () {
      if (ticketCart.articles.length === 0) {
        navigate("/dashboard/tickets");
      }
      if (data) {
        dispatch(
          setAmount(
            (
              data.article.priceDDV * Number(ticketCart.articles[0].quantity)
            ).toFixed(2),
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
      <div>
        <h1 className="flex items-center gap-4 font-semibold">
          <Link to={`/dashboard${childId ? `/child/${childId}` : ""}/tickets`}>
            Nakup vstopnice
          </Link>
          <ChevronRightIcon className="w-4 stroke-3" /> Plačilo
        </h1>
        {me.parentOf.length > 0 && (
          <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
            Nakupujem za:{" "}
            {!childId
              ? `${me.firstName} (jaz)`
              : `${childData.myChild.firstName} (${childData.myChild.age} let)`}
          </p>
        )}
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
              {ticketCart.articles[0].quantity}
            </span>
          </p>
          <p className="bg-primary/35 flex items-center justify-between rounded-xl px-4 py-3 md:col-start-2 md:w-full md:justify-self-end">
            Skupaj za plačilo:{" "}
            <span className="font-semibold">
              {(data.article.priceDDV * Number(ticketCart.articles[0].quantity))
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
            data.article.priceDDV * Number(ticketCart.articles[0].quantity)
          ).toFixed(2)}
          childId={childId}
          articles={ticketCart.articles}
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
  childId,
}: {
  amount: string;
  articles: { articleId: string; quantity: string }[];
  company: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    taxNumber: string;
  };
  childId?: string;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [payment, setPayment] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: buyArticlesOnline,
    onSuccess: (data) => {
      if (data instanceof Error) {
        throw data;
      } else {
        localStorage.removeItem("articles");
        localStorage.removeItem("company");
      }
    },
    onError: (error) => {
      console.log((error as Error).message);
    },
  });

  if (isPending) return <Spinner />;

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
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "EUR",
                          value: amount,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (_, actions) => {
                  await actions.order?.capture();

                  mutate({
                    articles,
                    company,
                    id: childId,
                  });

                  navigate(`${pathname}/success`);
                }}
                onCancel={() => {
                  navigate(pathname);
                }}
                onError={(err) => {
                  console.error("Napaka pri plačilu:", err);
                  alert("Plačilo ni uspelo.");
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
        Nakup vstopnice v spletni aplikaciji je možno izvršiti samo s spletnim
        plačilom. V kolikor želiš vstopnico kupiti z gotovino ali plačilno
        kartico kartico, lahko to opraviš v času delovnih ur na blagajni
        recepcije.
      </p>
    </>
  );
}

export default OnlineCart;
