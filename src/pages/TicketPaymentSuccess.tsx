import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../components/LinkBtn";
import { Link } from "react-router";
import Header from "../components/Header";

function TicketPaymentSuccess() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="flex items-center gap-4 text-2xl font-semibold">
          <Link to={`/dashboard/tickets`}>Nakup vstopnice</Link>{" "}
          <ChevronRightIcon className="w-6 stroke-3" /> Zaključen nakup
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
  return (
    <div className="border-primary flex gap-5 rounded-lg border bg-white px-3 py-6 lg:mx-auto lg:w-4/5 xl:w-2/3">
      <p className="font-quicksand from-primary to-secondary drop-shadow-input flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
        i
      </p>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">
          Nakup je bil uspešno izvršen. Na mail boste prejeli račun.
        </p>
        <p className="font-medium">
          Aktualne vstopnice si lahko ogledate pod zavihkom “Moje vstopnice in
          obiski”.
        </p>
      </div>
    </div>
  );
}

export default TicketPaymentSuccess;
