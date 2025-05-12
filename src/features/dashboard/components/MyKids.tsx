import { useQuery } from "@tanstack/react-query";
import { getMyKids } from "../../../services/userAPI";
import ChildCard from "./ChildCard";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Spinner from "../../../components/Spinner";
import { useState } from "react";
import ChildSignUpForm from "./ChildSignUpForm";

export interface IChild {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string | undefined;
  email: string | undefined;
  password: string;
}

function MyKids() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["mykids"],
    queryFn: getMyKids,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <p className="font-medium">Moji družinski člani</p>
      {data.length ? (
        <div className="flex flex-col gap-4">
          {data.map((el: { child: IChild }) => (
            <ChildCard key={el.child._id} child={el.child} />
          ))}
        </div>
      ) : (
        <p className="my-10 font-bold lg:text-lg">
          Trenutno še nimaš dodanih otrok.
        </p>
      )}
      <p className="font-medium lg:text-lg">
        Za svoje družinske člane lahko pregledaš aktualne vstopnice, seznam
        obiskov, urejaš prijave na tečaje in vadbe ter opraviš nakup vstopnic.
      </p>
      {!isOpen ? (
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
          onClick={() => setIsOpen(true)}
        >
          <p className="flex items-center gap-4">
            Dodaj otroka <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </button>
      ) : (
        <ChildSignUpForm setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

export default MyKids;
