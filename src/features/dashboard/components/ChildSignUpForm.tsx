import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useReducer,
} from "react";
import { createChild } from "../../../services/authAPI";
import { useQueryClient } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IInitialState {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  agreesToTerms: boolean;
  day: string;
  month: string;
  year: string;
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
  | { type: "agreesToTerms"; payload: string }
  | { type: "day"; payload: string }
  | { type: "month"; payload: string }
  | { type: "year"; payload: string }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };

const initialState: IInitialState = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  agreesToTerms: false,
  day: "",
  month: "",
  year: "",
  err: "",
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
    case "agreesToTerms": {
      return {
        ...state,
        agreesToTerms: action.payload === "on" ? true : false,
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
  const queryClient = useQueryClient();
  const [
    {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      agreesToTerms,
      day,
      month,
      year,
      err,
      isLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
        agreesToTerms,
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
        <p className="font-semibold">Osebni podatki</p>
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
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Naslov bivališča <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "address", payload: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Kraj bivališča <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "city", payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Poštna številka <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "postalCode", payload: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Država <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                onChange={(e) =>
                  dispatch({ type: "country", payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              required
              onChange={(e) =>
                dispatch({ type: "agreesToTerms", payload: e.target.value })
              }
            />
            <label>Strinjam se s pogoji uporabe otroka</label>
          </div>
          {err && <p className="self-end font-medium text-red-500">{err}</p>}

          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray mt-4 cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Ustvari otrokov profil"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChildSignUpForm;
