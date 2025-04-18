import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getClassCart,
  setArticleId,
  setPaymentMethod,
} from "../features/dashboard/classes/slices/classCartSlice";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signUpChildForClassOnline,
  signUpForClassOnline,
} from "../services/classAPI";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getOneArticle } from "../services/articlesAPI";
import PaymentForm from "../features/dashboard/payments/components/PaymentForm";
import {
  getPaymentData,
  setAmount,
} from "../features/dashboard/payments/slices/paymentSlice";

function ClassPayment() {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const dispatch = useAppDispatch();
  const classCart = useAppSelector(getClassCart);

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
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="flex items-center gap-4 text-2xl font-semibold">
          <Link to={`/dashboard/classes/${id}`}>Tečaji in vadbe</Link>{" "}
          <ChevronRightIcon className="w-6 stroke-3" /> Prijava
        </h1>
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
  const paymentData = useAppSelector(getPaymentData);
  const [err, setErr] = useState("");
  const [isChecked, setIsChecked] = useState<string | undefined>(undefined);

  const { mutate, isPending: isPendingBtn } = useMutation({
    mutationFn: signUpForClassOnline,
    onSuccess: (data) => {
      if (data.status === "error" || data.status === "fail") {
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
      mutate({ classCart });
    }
    if (
      isChecked === "" &&
      (!paymentData.amount ||
        !paymentData.card.number ||
        !paymentData.card.holder ||
        !paymentData.card.cvv ||
        !paymentData.card.expiryMonth ||
        !paymentData.card.expiryYear)
    ) {
      setErr("Prosim izpolnite vse podatke za plačilo!");
    }
    if (
      isChecked === "" &&
      paymentData.amount &&
      paymentData.card.number &&
      paymentData.card.holder &&
      paymentData.card.cvv &&
      paymentData.card.expiryMonth &&
      paymentData.card.expiryYear
    ) {
      mutate({ classCart, paymentData });
    }
  }

  return (
    <div className="flex flex-col gap-3 lg:mx-auto lg:w-2/3">
      <div
        className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:items-center`}
      >
        <p
          className={`font-quicksand text-lg font-bold uppercase ${article.endDate ? "md:col-span-2" : ""}`}
        >
          {article.name}
        </p>
        {article.endDate && (
          <p>
            <span className="font-semibold">Trajanje: </span>{" "}
            {new Date().toLocaleDateString()} -{" "}
            {new Date(article.endDate).toLocaleDateString()}
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
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`${isChecked === "" ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="font-medium">S plačilno kartico</p>
          </div>
          {isChecked === "" && <PaymentForm />}
          {err && (
            <p className="mx-4 font-medium text-red-500 lg:mx-auto lg:w-4/5 xl:w-3/4">
              {err}
            </p>
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
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`${isChecked ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Po predračunu</p>
              <p className="text-sm font-medium text-black/50">
                Znesek lahko poravnate tudi v času delovnih ur, na recepciji
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

function PaymentTypeChild() {
  const { id, childId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classCart = useAppSelector(getClassCart);
  const paymentData = useAppSelector(getPaymentData);
  const [err, setErr] = useState("");
  const [isChecked, setIsChecked] = useState<string | undefined>(undefined);

  const { mutate, isPending: isPendingBtn } = useMutation({
    mutationFn: signUpChildForClassOnline,
    onSuccess: (data) => {
      if (data.status === "error" || data.status === "fail") {
        console.log("error");
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
      mutate({ classCart, childId: childId! });
    }
    if (
      isChecked === "" &&
      (!paymentData.amount ||
        !paymentData.card.number ||
        !paymentData.card.holder ||
        !paymentData.card.cvv ||
        !paymentData.card.expiryMonth ||
        !paymentData.card.expiryYear)
    ) {
      setErr("Prosim izpolnite vse podatke za plačilo!");
    }
    if (
      isChecked === "" &&
      paymentData.amount &&
      paymentData.card.number &&
      paymentData.card.holder &&
      paymentData.card.cvv &&
      paymentData.card.expiryMonth &&
      paymentData.card.expiryYear
    ) {
      mutate({ classCart, paymentData, childId: childId! });
    }
  }

  return (
    <div className="flex flex-col gap-3 lg:mx-auto lg:w-2/3">
      <div
        className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:items-center`}
      >
        <p
          className={`font-quicksand text-lg font-bold uppercase ${article.endDate ? "md:col-span-2" : ""}`}
        >
          {article.name}
        </p>
        {article.endDate && (
          <p>
            <span className="font-semibold">Trajanje: </span>{" "}
            {new Date().toLocaleDateString()} -{" "}
            {new Date(article.endDate).toLocaleDateString()}
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
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`${isChecked === "" ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <p className="font-medium">S plačilno kartico</p>
          </div>
          {isChecked === "" && <PaymentForm />}
          {err && (
            <p className="mx-4 font-medium text-red-500 lg:mx-auto lg:w-4/5 xl:w-3/4">
              {err}
            </p>
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
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75 peer-checked:scale-125">
                <span
                  className={`${isChecked ? "bg-primary border border-black/75" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Po predračunu</p>
              <p className="text-sm font-medium text-black/50">
                Znesek lahko poravnate tudi v času delovnih ur, na recepciji
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
