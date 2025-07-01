import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createChild } from "../../../services/authAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getMe } from "../../../services/userAPI";

interface IInitialState {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  infoIsTrue: boolean;
  agreesToTerms: boolean;
  day: string;
  month: string;
  year: string;
  climbingAbility: number;
  err: string;
  isLoading: boolean;
}

type Action =
  | { type: "firstName"; payload: string }
  | { type: "lastName"; payload: string }
  | { type: "address"; payload: string }
  | { type: "city"; payload: string }
  | { type: "postalCode"; payload: string }
  | { type: "country"; payload: string }
  | { type: "infoIsTrue"; payload: boolean }
  | { type: "agreesToTerms"; payload: boolean }
  | { type: "day"; payload: string }
  | { type: "month"; payload: string }
  | { type: "year"; payload: string }
  | { type: "climbingAbility"; payload: number }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };

const initialState: IInitialState = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  infoIsTrue: false,
  agreesToTerms: false,
  day: "",
  month: "",
  year: "",
  err: "",
  climbingAbility: 0,
  isLoading: false,
};

function reducer(state: IInitialState, action: Action): IInitialState {
  switch (action.type) {
    case "firstName": {
      return {
        ...state,
        firstName: action.payload,
      };
    }
    case "lastName": {
      return {
        ...state,
        lastName: action.payload,
      };
    }
    case "address": {
      return {
        ...state,
        address: action.payload,
      };
    }
    case "city": {
      return {
        ...state,
        city: action.payload,
      };
    }
    case "postalCode": {
      return {
        ...state,
        postalCode: action.payload,
      };
    }
    case "country": {
      return {
        ...state,
        country: action.payload,
      };
    }
    case "infoIsTrue": {
      return {
        ...state,
        infoIsTrue: action.payload,
      };
    }
    case "agreesToTerms": {
      return {
        ...state,
        agreesToTerms: action.payload,
      };
    }
    case "day": {
      return {
        ...state,
        day: action.payload,
      };
    }
    case "month": {
      return {
        ...state,
        month: action.payload,
      };
    }
    case "year": {
      return {
        ...state,
        year: action.payload,
      };
    }
    case "climbingAbility": {
      return {
        ...state,
        climbingAbility: action.payload,
      };
    }
    case "error": {
      return {
        ...state,
        err: action.payload,
      };
    }
    case "loading": {
      return { ...state, isLoading: action.payload };
    }
    default: {
      return state;
    }
  }
}

function ChildSignUpForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const [asParent, setAsParent] = useState(false);
  const queryClient = useQueryClient();
  const [
    {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      infoIsTrue,
      agreesToTerms,
      day,
      month,
      year,
      climbingAbility,
      err,
      isLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [ability, setAbility] = useState(0);
  const [isOpenSub, setIsOpenSub] = useState(false);

  const climbingOptions = [
    "0 - brez plezalnega znanja",
    "1 - zelo lahko (3-4)",
    "2 - lahko (4-5B)",
    "3 - zmerno (5B-6A+)",
    "4 - srednje težko (6A+-6C)",
    "5 - težko (6C-7A+)",
    "6 - zelo težko (7A+-7C)",
    "7 - ekstremno (več kot 7C)",
  ];

  useEffect(() => {
    if (day && month && year) {
      const birthDate = new Date(Number(year), Number(month) - 1, Number(day)); // Meseci so 0-indeksirani
      const today = new Date();

      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        calculatedAge--;
      }

      if (calculatedAge >= 18) {
        dispatch({
          type: "error",
          payload:
            "18 letni in starejši uporabniki se morajo samostojno prijaviti.",
        });
      } else {
        dispatch({ type: "error", payload: "" });
      }
    }
  }, [day, month, year, dispatch]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch({ type: "loading", payload: false });
      dispatch({ type: "error", payload: "" });

      const newChild = {
        firstName,
        lastName,
        birthDate: `${month}.${day}.${year}`,
        address,
        city,
        postalCode,
        country,
        infoIsTrue,
        agreesToTerms,
        climbingAbility,
      };

      const result = await createChild(newChild);

      if (result instanceof Error) {
        throw result;
      }

      await queryClient.invalidateQueries({ queryKey: ["mykids"] });
      setIsOpen(false);
    } catch (error) {
      dispatch({
        type: "error",
        payload: (error as Error).message,
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <div className="relative rounded-xl bg-white px-4 py-7 lg:px-6 lg:py-9">
      <XMarkIcon
        className="absolute top-6 right-6 h-6 cursor-pointer stroke-2 text-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div className="flex flex-col gap-8 lg:mx-auto lg:w-4/5">
        <p className="font-semibold">Podatki o mladoletni osebi</p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Ime <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "firstName", payload: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Priimek <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "lastName", payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Datum rojstva <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-between">
                <select
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  autoComplete="off"
                  required
                  onChange={(e) =>
                    dispatch({ type: "day", payload: e.target.value })
                  }
                >
                  <option value="">Dan</option>
                  {Array.from({ length: 31 }).map((_, i) => (
                    <option key={i} value={i > 9 ? i + 1 : `0${i + 1}`}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  autoComplete="off"
                  required
                  onChange={(e) =>
                    dispatch({ type: "month", payload: e.target.value })
                  }
                >
                  <option value="">Mesec</option>
                  <option value="01">Januar</option>
                  <option value="02">Februar</option>
                  <option value="03">Marec</option>
                  <option value="04">April</option>
                  <option value="05">Maj</option>
                  <option value="06">Junij</option>
                  <option value="07">Julij</option>
                  <option value="08">Avgust</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  autoComplete="off"
                  required
                  onChange={(e) =>
                    dispatch({ type: "year", payload: e.target.value })
                  }
                >
                  <option value="">Leto</option>
                  {Array.from({ length: 18 }).map((_, i) => (
                    <option
                      key={(i + 1) * 100}
                      value={new Date().getFullYear() - i - 1}
                    >
                      {new Date().getFullYear() - i - 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative z-50 flex flex-col gap-1">
              <p className="text-sm font-medium">
                Plezalno znanje<span className="text-red-500">*</span>
              </p>
              <input
                className="drop-shadow-input border-gray w-full rounded-lg border bg-white px-3.5 py-2.5"
                placeholder="Izberi podkategorijo"
                disabled
                value={climbingOptions[ability]}
              />
              <ChevronDownIcon
                className={`absolute right-4 bottom-3 w-5 cursor-pointer stroke-2 ${isOpenSub ? "rotate-180" : ""}`}
                onClick={() => setIsOpenSub((isOpen) => !isOpen)}
              />
              {isOpenSub && (
                <div className="absolute top-[110%] left-0 flex w-full flex-col gap-2 rounded-lg border border-black/20 bg-white px-4 py-2 shadow-xs">
                  {climbingOptions.map((climbingOption, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className={`h-6 w-6 cursor-pointer rounded-lg border border-black/50 ${ability === i ? "bg-primary/50" : ""}`}
                        onClick={() => {
                          setAbility(i);
                          dispatch({ type: "climbingAbility", payload: i });
                          setIsOpenSub(false);
                        }}
                      ></span>
                      {climbingOption}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Naslov bivališča</label>
              <input
                type="text"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "address", payload: e.target.value })
                }
                disabled={asParent}
                value={asParent ? data.address : undefined}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Kraj bivališča</label>
              <input
                type="text"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "city", payload: e.target.value })
                }
                disabled={asParent}
                value={asParent ? data.city : undefined}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Poštna številka</label>
              <input
                type="text"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "postalCode", payload: e.target.value })
                }
                disabled={asParent}
                value={asParent ? data.postalCode : undefined}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Država</label>
              <input
                type="text"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "country", payload: e.target.value })
                }
                disabled={asParent}
                value={asParent ? data.country : undefined}
              />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span
              className={`h-5 w-5 flex-none cursor-pointer rounded-lg border border-black/50 ${asParent ? "bg-primary/50" : "bg-white"}`}
              onClick={() => {
                setAsParent((asParent) => !asParent);
                if (!asParent) {
                  dispatch({
                    type: "address",
                    payload: data.address,
                  });
                  dispatch({
                    type: "city",
                    payload: data.city,
                  });
                  dispatch({
                    type: "postalCode",
                    payload: data.postalCode,
                  });
                  dispatch({
                    type: "country",
                    payload: data.country,
                  });
                }
              }}
            ></span>
            <label>Podatki o bivališču se enaki kot pri meni.</label>
          </div>
          <div className="flex items-start gap-4">
            <span
              className={`h-5 w-5 flex-none cursor-pointer rounded-lg border border-black/50 ${infoIsTrue ? "bg-primary/50" : "bg-white"}`}
              onClick={() => {
                dispatch({
                  type: "infoIsTrue",
                  payload: !infoIsTrue ? true : false,
                });
              }}
            ></span>
            <label>
              Izjavljam, da sem zakoniti skrbnik/-ca oz. garant s pisnim
              pooblastilom skrbnika zgoraj navedene mladoletne osebe in da so
              podatki, ki sem jih navedel oziroma navedla, točni.
              <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex items-start gap-4">
            <span
              className={`h-5 w-5 flex-none cursor-pointer rounded-lg border border-black/50 ${agreesToTerms ? "bg-primary/50" : "bg-white"}`}
              onClick={() => {
                dispatch({
                  type: "agreesToTerms",
                  payload: !agreesToTerms ? true : false,
                });
              }}
            ></span>
            <label>
              Prebral/-a sem in se strinjam s{" "}
              <a
                href="https://bolderaj.si/splosni-pogoji-poslovanja/"
                target="_blank"
                className="cursor-pointer font-medium hover:underline"
              >
                Splošnimi pogoji poslovanja
              </a>{" "}
              in{" "}
              <a
                href="https://bolderaj.si/pravila-in-pogoji-uporabe-plezalnega-centra-bolderaj/"
                target="_blank"
                className="cursor-pointer font-medium hover:underline"
              >
                Pravili in pogoji uporabe plezalnega centra Bolderaj
              </a>
              , ki določajo hišni red in pogoje uporabe plezalnega centra
              Bolderaj ter v imenu zadevne mladoletne osebe soglašam z njihovim
              spoštovanje <span className="text-red-500">*</span>
            </label>
          </div>
          {err && <p className="self-end font-medium text-red-500">{err}</p>}

          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray mt-4 cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Ustvari profil mladoletne osebe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChildSignUpForm;
