import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useReducer } from "react";
import { updatePassword } from "../../../services/authAPI";

interface IUser {
  email: string;
}

interface IInitialState {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  err: string;
  success: string;
  isLoading: boolean;
}

const initialState: IInitialState = {
  currentPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
  err: "",
  success: "",
  isLoading: false,
};

type Action =
  | { type: "currentPassword"; payload: string }
  | { type: "newPassword"; payload: string }
  | { type: "newPasswordConfirm"; payload: string }
  | { type: "error"; payload: string }
  | { type: "success" }
  | { type: "loading"; payload: boolean };

function reducer(state: IInitialState, action: Action): IInitialState {
  switch (action.type) {
    case "currentPassword": {
      return {
        ...state,
        currentPassword: action.payload,
      };
    }
    case "newPassword": {
      return {
        ...state,
        newPassword: action.payload,
      };
    }
    case "newPasswordConfirm": {
      return {
        ...state,
        newPasswordConfirm: action.payload,
      };
    }
    case "error": {
      return {
        ...state,
        err: action.payload,
        success: "",
      };
    }
    case "success": {
      return { ...state, err: "", success: "Uspešno ste spremenili geslo" };
    }
    case "loading": {
      return { ...state, isLoading: action.payload };
    }
    default: {
      return state;
    }
  }
}

function LoginData() {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<IUser>(["me"]);
  const [
    {
      currentPassword,
      newPassword,
      newPasswordConfirm,
      err,
      success,
      isLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  if (!me) {
    return <p>Nekaj je šlo narobe!</p>;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch({ type: "loading", payload: true });
      if (newPassword !== newPasswordConfirm) {
        throw new Error("Gesli se ne ujemata.");
      }

      if (newPassword.length < 8) {
        throw new Error("Geslo mora imeti vsaj 8 znakov.");
      }

      const result = await updatePassword(currentPassword, newPassword);

      if (result instanceof Error) {
        throw result;
      }

      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error", payload: (error as Error).message });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">Podatki za prijavo v spletno aplikacijo</p>
      <form
        className="flex flex-col gap-6 rounded-xl bg-white px-5 py-4 md:grid md:grid-cols-2 lg:px-20 lg:py-16"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Elektronski naslov</label>
          <input
            type="text"
            value={me.email}
            disabled
            className="drop-shadow-input border-gray cursor-not-allowed rounded-lg border bg-white px-3.5 py-2.5"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Trenutno geslo <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
              placeholder="Vnesite trenutno geslo"
              onChange={(e) =>
                dispatch({ type: "currentPassword", payload: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Novo geslo <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
              placeholder="Vnesite novo geslo"
              onChange={(e) =>
                dispatch({ type: "newPassword", payload: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Potrdite novo geslo <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
              placeholder="Potrdite novo geslo"
              onChange={(e) =>
                dispatch({
                  type: "newPasswordConfirm",
                  payload: e.target.value,
                })
              }
            />
          </div>
          {err && <p className="text-sm font-bold text-red-500">{err}</p>}
          {success && (
            <p className="text-primary text-sm font-bold">{success}</p>
          )}
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Spremeni geslo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginData;
