import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../components/LinkBtn";
import { Link, useParams, useSearchParams } from "react-router";
import Header from "../../components/Header";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { buyArticlesOnline } from "../../services/articlesAPI";
import Spinner from "../../components/Spinner";

function TicketPaymentSuccess() {
  const [searchParams] = useSearchParams();
  const hasMutated = useRef(false);
  const checkoutId = searchParams.get("id");
  const { childId } = useParams();
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

  useEffect(
    function () {
      if (checkoutId && !hasMutated.current) {
        const articles = JSON.parse(localStorage.getItem("articles") as string);
        const company = JSON.parse(localStorage.getItem("company") as string);

        mutate({
          articles,
          company,
          id: childId,
          checkoutId,
          paymentMethod: "online",
        });

        hasMutated.current = true;
      }
    },
    [checkoutId],
  );

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="flex items-center gap-4 font-semibold">
          <Link to={`/dashboard${childId ? `/child/${childId}` : ""}/tickets`}>
            Nakup vstopnice
          </Link>{" "}
          <ChevronRightIcon className="w-6 stroke-3" /> Zaključek nakupa
        </h1>
      </div>
      <PaymentInfo />
      <div className="lg:mx-auto lg:w-4/5 xl:w-2/3">
        <LinkBtn to="/dashboard" type="primary">
          <p className="flex items-center gap-4">
            <ChevronLeftIcon className="w-4 stroke-3" />
            Nazaj na domačo stran
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

function PaymentInfo() {
  return (
    <div className="border-primary flex gap-5 rounded-lg border bg-white px-3 py-6 lg:mx-auto lg:w-4/5 xl:w-2/3">
      <p className="font-quicksand from-primary to-secondary drop-shadow-input flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
        i
      </p>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">
          Nakup je bil uspešno izvršen. Na elektronski naslov smo poslali račun.
        </p>
        <p className="font-medium">
          Aktualne vstopnice si lahko ogledaš pod zavihkom “Moje vstopnice in
          obiski”.
        </p>
      </div>
    </div>
  );
}

export default TicketPaymentSuccess;
