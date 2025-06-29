import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getClassCart,
  setArticleId,
  setPaymentMethod,
} from "../../features/dashboard/classes/slices/classCartSlice";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signUpChildForClassOnline,
  signUpForClassOnline,
} from "../../services/classAPI";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import { getOneArticle } from "../../services/articlesAPI";
import { setAmount } from "../../features/dashboard/payments/slices/paymentSlice";
import CompanyInvoiceForm from "../../features/dashboard/payments/components/CompanyInvoiceForm";
import { getTicketCart } from "../../features/dashboard/tickets/slices/ticketCartSlice";
import ClassPaymentForm from "../../features/dashboard/payments/components/ClassPaymentForm";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function ClassPayment() {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const dispatch = useAppDispatch();
  const classCart = useAppSelector(getClassCart);
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{
    firstName: string;
    parentOf: unknown[];
  }>(["me"])!;
  const child = queryClient.getQueryData<{
    myChild: { firstName: string; age: string };
  }>(["child"])?.myChild;

  useEffect(
    function () {
      if (classCart.classes.length === 0) {
        navigate("/dashboard/classes");
      }
      dispatch(setArticleId(id));
    },
    [id, dispatch, navigate, classCart],
  );

  return (
    <div className="my-16 flex flex-col">
      <Header />
      <div className="mt-10 flex flex-col gap-14 lg:mt-16">
        <div>
          <h1 className="flex items-center gap-4 font-semibold">
            <Link
              to={`/dashboard${childId ? `/child/${childId}` : ""}/classes/${id}`}
            >
              Aktivnosti in vadbe
            </Link>{" "}
            <ChevronRightIcon className="w-4 stroke-3" /> Prijava
          </h1>
          {me.parentOf.length > 0 && (
            <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
              Nakupujem za:{" "}
              {!childId
                ? `${me.firstName} (jaz)`
                : `${child?.firstName} (${child?.age} let)`}
            </p>
          )}
        </div>
      </div>
      {childId ? <PaymentTypeChild /> : <PaymentType />}
    </div>
  );
}

function PaymentType() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classCart = useAppSelector(getClassCart);
  const ticketCart = useAppSelector(getTicketCart);
  const [isChecked, setIsChecked] = useState<string | undefined>(undefined);

  const { mutate, isPending: isPendingBtn } = useMutation({
    mutationFn: signUpForClassOnline,
    onSuccess: (data) => {
      if (data instanceof Error) {
        return;
      } else {
        navigate(`${pathname}/success`);
      }
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(id!),
  });

  useEffect(
    function () {
      if (data.article.endDate) {
        dispatch(setAmount(data.article.classPriceData.priceDDV.toFixed(2)));
      }
      if (!data.article.endDate) {
        dispatch(setAmount(data.article.priceDDV.toFixed(2)));
      }
    },
    [data, dispatch],
  );

  if (isPending) {
    return <Spinner />;
  }

  const { article } = data;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.value);
    dispatch(setPaymentMethod(e.target.value));
  }

  async function handleClick() {
    if (isChecked === "preInvoice") {
      mutate({ classCart, company: ticketCart.company });
    }
  }

  return (
    <div className="mt-14 flex flex-col lg:mx-auto lg:mt-20 lg:w-2/3">
      <p className="mb-2 font-medium">Povzetek nakupa</p>

      <div
        className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:items-center md:px-8`}
      >
        <p
          className={`font-quicksand text-lg font-bold uppercase ${article.endDate ? "md:col-span-2" : ""}`}
        >
          {article.name.sl}
        </p>
        {article.endDate && (
          <p>
            <span className="font-semibold">Trajanje: </span>{" "}
            {new Date().toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(article.endDate).toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        )}
        <p className="bg-primary/35 rounded-xl px-4 py-3 md:justify-self-end">
          Skupaj za plačilo:{" "}
          <span className="font-semibold">
            {(article.endDate
              ? article.classPriceData.priceDDV
              : article.priceDDV
            )
              .toFixed(2)
              .replace(".", ",")}{" "}
            €
          </span>
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-8 rounded-xl bg-white px-4 py-6 md:px-8 lg:mt-16 lg:py-10">
        <CompanyInvoiceForm />
      </div>
      <p className="mt-10 mb-2 font-medium lg:mt-16">
        Izberi način plačila in dokončaj prijavo
      </p>
      <div className="flex flex-col gap-8 rounded-xl bg-white p-4 md:px-8">
        <p className="font-semibold">Znesek želim poravnati:</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isChecked === ""}
                onChange={handleChange}
                value=""
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={`${isChecked === "" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="font-medium">s plačilno kartico</p>
          </div>
          <ClassPaymentForm />
          <div className="flex gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isChecked === "preInvoice"}
                onChange={handleChange}
                value="preInvoice"
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={`${isChecked === "preInvoice" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <div className="flex flex-col gap-2">
              <p className="font-medium">po predračunu</p>
              <p className="text-sm font-medium text-black/50">
                Znesek lahko poravnaš tudi v času delovnih ur, na recepciji
                plezalnega centra, pred pričetkom tečaja.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value="paypal"
                onChange={(e) => setIsChecked(e.target.value)}
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={
                    isChecked === "paypal"
                      ? `bg-primary border-gray h-4 w-4 rounded-full border`
                      : ""
                  }
                />
              </div>
            </label>
            <p className="font-medium">s PayPal-om</p>
          </div>
          {isChecked === "paypal" && (
            <div className="lg:mx-auto lg:w-1/2">
              <PayPalScriptProvider
                options={{
                  clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
                  currency: "EUR",
                  disableFunding: "card",
                }}
              >
                <PayPalButtons
                  createOrder={(_, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "EUR",
                            value: article.endDate
                              ? article.classPriceData.priceDDV.toFixed(2)
                              : article.priceDDV.toFixed(2),
                          },
                        },
                      ],
                      intent: "CAPTURE",
                    });
                  }}
                  onApprove={async (_, actions) => {
                    await actions.order?.capture();

                    await signUpForClassOnline({
                      classCart,
                      company: ticketCart.company,
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
      </div>
      {isChecked === "preInvoice" && (
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:from-gray disabled:to-gray mt-10 cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleClick}
          disabled={isPendingBtn || isChecked === undefined}
        >
          {!isPendingBtn ? (
            <p className="flex items-center gap-4">
              Zaključi prijavo
              <ChevronRightIcon className="w-6 stroke-3" />
            </p>
          ) : (
            "Postopek je v teku..."
          )}
        </button>
      )}
    </div>
  );
}

function PaymentTypeChild() {
  const { id, childId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classCart = useAppSelector(getClassCart);
  const ticketCart = useAppSelector(getTicketCart);
  const [isChecked, setIsChecked] = useState<string | undefined>(undefined);

  const { mutate, isPending: isPendingBtn } = useMutation({
    mutationFn: signUpChildForClassOnline,
    onSuccess: (data) => {
      if (data instanceof Error) {
        return null;
      } else {
        navigate(`${pathname}/success`);
      }
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(id!),
  });

  useEffect(
    function () {
      if (data.article.endDate) {
        dispatch(setAmount(data.article.classPriceData.priceDDV));
      }
      if (!data.article.endDate) {
        dispatch(setAmount(data.article.priceDDV));
      }
    },
    [data, dispatch],
  );

  if (isPending) {
    return <Spinner />;
  }

  const { article } = data;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.value);
    dispatch(setPaymentMethod(e.target.value));
  }

  async function handleClick() {
    if (isChecked === "preInvoice") {
      mutate({ classCart, company: ticketCart.company, childId: childId! });
    }
  }

  return (
    <div className="mt-14 flex flex-col gap-3 lg:mx-auto lg:mt-20 lg:w-2/3">
      <div
        className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:items-center`}
      >
        <p
          className={`font-quicksand text-lg font-bold uppercase ${article.endDate ? "md:col-span-2" : ""}`}
        >
          {article.name.sl}
        </p>
        {article.endDate && (
          <p>
            <span className="font-semibold">Trajanje: </span>{" "}
            {new Date().toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(article.endDate).toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        )}
        <p className="bg-primary/35 rounded-xl px-4 py-3 md:justify-self-end">
          Skupaj za plačilo:{" "}
          <span className="font-semibold">
            {(article.endDate
              ? article.classPriceData.priceDDV
              : article.priceDDV
            )
              .toFixed(2)
              .replace(".", ",")}{" "}
            €
          </span>
        </p>
      </div>
      <p className="font-medium">Izberi način plačila in dokončaj prijavo</p>
      <div className="flex flex-col gap-8 rounded-xl bg-white p-4">
        <p className="font-semibold">Znesek želim poravnati:</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isChecked === ""}
                onChange={handleChange}
                value=""
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={`${isChecked === "" ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="font-medium">s plačilno kartico</p>
          </div>
          <ClassPaymentForm />
          {isChecked === "paypal" && (
            <div className="lg:mx-auto lg:w-1/2">
              <PayPalScriptProvider
                options={{
                  clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
                  currency: "EUR",
                  disableFunding: "card",
                }}
              >
                <PayPalButtons
                  createOrder={(_, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "EUR",
                            value: article.endDate
                              ? article.classPriceData.priceDDV.toFixed(2)
                              : article.priceDDV.toFixed(2),
                          },
                        },
                      ],
                      intent: "CAPTURE",
                    });
                  }}
                  onApprove={async (_, actions) => {
                    await actions.order?.capture();

                    await signUpChildForClassOnline({
                      classCart,
                      company: ticketCart.company,
                      childId: childId!,
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
          <div className="flex gap-3">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isChecked === "preInvoice"}
                onChange={handleChange}
                value="preInvoice"
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={`${isChecked ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <div className="flex flex-col gap-2">
              <p className="font-medium">po predračunu</p>
              <p className="text-sm font-medium text-black/50">
                Znesek lahko poravnaš tudi v času delovnih ur, na recepciji
                plezalnega centra, pred pričetkom tečaja.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:from-gray disabled:to-gray cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleClick}
        disabled={isPendingBtn || isChecked === undefined}
      >
        {!isPendingBtn ? (
          <p className="flex items-center gap-4">
            Zaključi prijavo
            <ChevronRightIcon className="w-6 stroke-3" />
          </p>
        ) : (
          "Postopek je v teku..."
        )}
      </button>
    </div>
  );
}

export default ClassPayment;
