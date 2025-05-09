import { useParams } from "react-router";
import AuthLogo from "../../features/auth/components/AuthLogo";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LinkBtn from "../../components/LinkBtn";
import Spinner from "../../components/Spinner";
import { confirmMail } from "../../services/authAPI";
import { useQuery } from "@tanstack/react-query";

function ConfirmMail() {
  const { token } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["mail"],
    queryFn: () => confirmMail(token!),
    enabled: !!token,
  });

  if (isPending) {
    <Spinner />;
  }

  return (
    <main className="my-16 flex flex-col gap-12 lg:mx-auto lg:mt-9 lg:w-1/2">
      <div className="w-5/6 lg:w-1/3">
        <AuthLogo />
      </div>
      <div className="border-primary drop-shadow-input flex flex-col gap-10 rounded-lg border bg-white/75 py-6 text-center">
        {data instanceof Error ? (
          <XMarkIcon className="from-primary to-secondary drop-shadow-input mx-auto h-10 w-fit rounded-lg bg-gradient-to-r stroke-2 px-3 py-2.5 text-black" />
        ) : (
          <ShieldCheckIcon className="from-primary to-secondary drop-shadow-input mx-auto h-10 w-fit rounded-lg bg-gradient-to-r stroke-2 px-3 py-2.5 text-black" />
        )}
        <p className="font-semibold">
          {data instanceof Error
            ? "Vaš rok za potrditev maila je potekel!"
            : "Uspešno ste potrdili vaš elektronski naslov."}
        </p>
        {data instanceof Error ? (
          <p className="text-sm">
            Prosim obrnite se na podpora@bolderaj.si za nadaljne korake.
          </p>
        ) : (
          <p className="text-sm">Želimo vam varno in prijetno plezanje!</p>
        )}
      </div>

      {!(data instanceof Error) && (
        <LinkBtn to="/" type="primary">
          <p className="flex items-center justify-center gap-6">
            Prijavite se v svoj račun{" "}
            <ChevronRightIcon className="h-6 stroke-3" />
          </p>
        </LinkBtn>
      )}
    </main>
  );
}

export default ConfirmMail;
