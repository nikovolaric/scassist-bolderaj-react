import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  clearSignupData,
  getSignUpData,
  setEmail,
  setPassword,
  setPasswordConfirm,
} from "../slices/signUpSlice";
import { FormEvent, useEffect, useState } from "react";
import { signUpNewUser } from "../../../services/authAPI";
import LinkBtn from "../../../components/LinkBtn";

function SignUpEndForm() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getSignUpData);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (userData.password.length < 8 && userData.password !== "") {
        setErr("Geslo mora imeti vsaj 8 znakov");
      } else {
        setErr("");
      }
    },
    [userData.password],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (userData.password !== userData.passwordConfirm) {
        throw new Error("Gesli se ne ujemata!");
      }

      const result = await signUpNewUser(userData);

      if (result instanceof Error) {
        throw result;
      }

      dispatch(clearSignupData());
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold lg:text-3xl">Registrirajte se</h1>
      <div className="flex flex-col gap-8">
        <p className="flex items-center gap-4 text-lg font-semibold lg:text-xl">
          <span className="bg-primary rounded-lg border border-black px-2.5 py-0.5">
            2
          </span>
          Podatki za prijavo v spletno aplikacijo Bolderaj
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Elektronski naslov <span className="text-red-500"></span>
            </label>
            <input
              type="text"
              placeholder="Vnesite elektronski naslov"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
              autoComplete="off"
              required={true}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Geslo <span className="text-red-500"></span>
              </label>
              <input
                type="password"
                placeholder="Vnesite geslo"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required={true}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Potrdite geslo <span className="text-red-500"></span>
              </label>
              <input
                type="password"
                placeholder="Ponovno vnesite geslo"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required={true}
                onChange={(e) => dispatch(setPasswordConfirm(e.target.value))}
              />
            </div>
          </div>
          {err && <p className="font-medium text-red-500">{err}</p>}
          <div className="mt-5 flex items-center justify-between">
            <LinkBtn to="/signup" type="secondary">
              <span>
                <ChevronLeftIcon className="h-4 stroke-3" />
              </span>
            </LinkBtn>
            <button
              className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                "..."
              ) : (
                <p className="flex items-center gap-10">
                  Zaključi registracijo
                  <span>
                    <ChevronRightIcon className="h-4 stroke-3" />
                  </span>
                </p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpEndForm;
