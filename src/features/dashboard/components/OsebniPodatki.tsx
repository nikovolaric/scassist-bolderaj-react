import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useReducer, useState } from "react";
import { updateMe } from "../../../services/userAPI";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface IUser {
  firstName: string | undefined;
  lastName: string | undefined;
  birthDate?: string;
  address: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  climbingAbility: number | undefined;
}

const initialState: IUser = {
  firstName: undefined,
  lastName: undefined,
  address: undefined,
  city: undefined,
  postalCode: undefined,
  country: undefined,
  phoneNumber: undefined,
  email: undefined,
  climbingAbility: undefined,
};

type Action =
  | { type: "firstName"; payload: string }
  | { type: "lastName"; payload: string }
  | { type: "address"; payload: string }
  | { type: "city"; payload: string }
  | { type: "postalCode"; payload: string }
  | { type: "country"; payload: string }
  | { type: "phoneNumber"; payload: string }
  | { type: "email"; payload: string }
  | { type: "climbingAbility"; payload: number };

function reducer(state: IUser, action: Action) {
  switch (action.type) {
    case "firstName": {
      return { ...state, firstName: action.payload };
    }
    case "lastName": {
      return { ...state, lastName: action.payload };
    }
    case "address": {
      return { ...state, address: action.payload };
    }
    case "city": {
      return { ...state, city: action.payload };
    }
    case "postalCode": {
      return { ...state, postalCode: action.payload };
    }
    case "country": {
      return { ...state, country: action.payload };
    }
    case "phoneNumber": {
      return { ...state, phoneNumber: action.payload };
    }
    case "email": {
      return { ...state, email: action.payload };
    }
    case "climbingAbility": {
      return { ...state, climbingAbility: Number(action.payload) };
    }
    default: {
      return state;
    }
  }
}

function OsebniPodatki() {
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

  const [
    {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      phoneNumber,
      email,
      climbingAbility,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSub, setIsOpenSub] = useState(false);
  const [err, setErr] = useState("");
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<IUser>(["me"]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = await updateMe(
        firstName,
        lastName,
        address,
        city,
        postalCode,
        country,
        phoneNumber,
        email,
        climbingAbility,
      );

      if (data instanceof Error) {
        return data;
      }

      setErr("");
      setIsEditing(false);
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!me) {
    return <p>Nekaj je šlo narobe!</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">Osebni podatki</p>
      <form
        className="flex flex-col gap-6 rounded-xl bg-white px-5 py-4 lg:px-20 lg:py-16"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Ime</label>
            <input
              type="text"
              defaultValue={me.firstName}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "firstName", payload: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Priimek</label>
            <input
              type="text"
              defaultValue={me.lastName}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "lastName", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Datum rojstva</label>
            <input
              type="text"
              defaultValue={new Date(me.birthDate!).toLocaleDateString(
                "sl-SI",
                {
                  day: "2-digit",
                  year: "numeric",
                  month: "2-digit",
                },
              )}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
          <div className="relative z-50 flex flex-col gap-1">
            <p className="text-sm font-medium">Plezalno znanje</p>
            <input
              className="drop-shadow-input border-gray w-full rounded-lg border bg-white px-3.5 py-2.5"
              placeholder="Izberi podkategorijo"
              disabled
              value={climbingOptions[climbingAbility || me.climbingAbility!]}
            />
            {isEditing && (
              <ChevronDownIcon
                className={`absolute right-4 bottom-3 w-5 cursor-pointer stroke-2 ${isOpenSub ? "rotate-180" : ""}`}
                onClick={() => setIsOpenSub((isOpen) => !isOpen)}
              />
            )}
            {isOpenSub && (
              <div className="absolute top-[110%] left-0 flex w-full flex-col gap-2 rounded-lg border border-black/20 bg-white px-4 py-2 shadow-xs">
                {climbingOptions.map((climbingOption, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 cursor-pointer rounded-lg border border-black/50 ${(climbingAbility || me.climbingAbility!) === i ? "bg-primary/50" : ""}`}
                      onClick={() => {
                        dispatch({ type: "climbingAbility", payload: i });
                      }}
                    ></span>
                    {climbingOption}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Naslov bivališča</label>
            <input
              type="text"
              defaultValue={me.address}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "address", payload: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Kraj bivališča</label>
            <input
              type="text"
              defaultValue={me.city}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "city", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Poštna številka</label>
            <input
              type="text"
              defaultValue={me.postalCode}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "postalCode", payload: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Država</label>
            <input
              type="text"
              defaultValue={me.country}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "country", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Telefonska številka</label>
            <input
              type="text"
              defaultValue={me.phoneNumber}
              disabled={me.phoneNumber !== undefined && !isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "phoneNumber", payload: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Elektronski naslov</label>
            <input
              type="text"
              defaultValue={me.email}
              disabled={!isEditing}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
            />
          </div>
        </div>
        {err && <p className="font-medium text-red-500">{err}</p>}
        {isEditing ? (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Shrani"}
          </button>
        ) : (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Uredi podatke
          </button>
        )}
      </form>
    </div>
  );
}

// function EditPersonalData({me}:{me:IUser}){
//   return <div className="flex flex-col gap-3">
//   <p className="font-semibold">Osebni podatki</p>
//   <form className="flex flex-col gap-6 rounded-xl bg-white px-5 py-4 lg:px-20 lg:py-16">
//     <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Ime</label>
//         <input
//           type="text"
//           value={me.firstName}
//                     className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Priimek</label>
//         <input
//           type="text"
//           value={me.lastName}
//                     className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>
//     </div>
//     <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Datum rojstva</label>
//         <input
//           type="text"
//           value={new Date(me.birthDate).toLocaleDateString("sl-SI", {
//             day: "2-digit",
//             year: "numeric",
//             month: "2-digit",
//           })}
//           disabled
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//         <div className="hidden lg:block" />
//       </div>
//     </div>
//     <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Naslov bivališča</label>
//         <input
//           type="text"
//           value={me.address}
//           disabled
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>

//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Kraj bivališča</label>
//         <input
//           type="text"
//           value={me.city}
//           disabled
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>
//     </div>
//     <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Poštna številka</label>
//         <input
//           type="text"
//           value={me.postalCode}
//           disabled
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>

//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Država</label>
//         <input
//           type="text"
//           value={me.country}
//           disabled
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>
//     </div>
//     <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Telefonska številka</label>
//         <input
//           type="text"
//           value={me.phoneNumber}
//           disabled={me.phoneNumber !== undefined}
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>
//       <div className="flex flex-col gap-1.5">
//         <label className="text-sm font-medium">Elektronski naslov</label>
//         <input
//           type="text"
//           value={me.email}
//           disabled
//           className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
//         />
//       </div>
//     </div>
//   </form>
// </div>
// }

export default OsebniPodatki;
