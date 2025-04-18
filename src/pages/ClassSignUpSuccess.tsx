import { Link, useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import { getClassCart } from "../features/dashboard/classes/slices/classCartSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getOneArticle } from "../services/articlesAPI";
import Spinner from "../components/Spinner";
import LinkBtn from "../components/LinkBtn";

function ClassSignUpSuccess() {
  const { id } = useParams();

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="flex items-center gap-4 text-2xl font-semibold">
          <Link to={`/dashboard/classes/${id}`}>Tečaji in vadbe</Link>{" "}
          <ChevronRightIcon className="w-6 stroke-3" /> Prijava
        </h1>
      </div>
      <PaymentInfo />
      <div className="lg:mx-auto lg:w-4/5 xl:w-2/3">
        <LinkBtn to="/dashboard" type="primary">
          <p className="flex items-center gap-4">
            <ChevronLeftIcon className="w-4 stroke-3" />
            Nazaj na oglasno desko
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

function PaymentInfo() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(id!),
    enabled: !!id,
  });
  const { paymentMethod } = useAppSelector(getClassCart);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="border-primary flex gap-5 rounded-lg border bg-white px-3 py-6 lg:mx-auto lg:w-4/5 xl:w-2/3">
      <p className="font-quicksand from-primary to-secondary drop-shadow-input flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
        i
      </p>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">
          Vaša prijava na {data.article.name} je bila uspešna.
        </p>
        {paymentMethod === "preInvoice" ? (
          <p className="font-medium">
            Na mail boste prejeli predračun, ki ga je potrebno poravnati do
            pričetka tečaja.
          </p>
        ) : (
          <p className="font-medium">Na mail boste prejeli račun.</p>
        )}
      </div>
    </div>
  );
}

export default ClassSignUpSuccess;
