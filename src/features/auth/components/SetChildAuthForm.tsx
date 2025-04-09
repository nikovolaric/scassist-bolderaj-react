import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { setChildAuth } from "../../../services/authAPI";

function SetChildAuthForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: setChildAuth,
    onSuccess: (data) => {
      if (data instanceof Error) {
        throw data;
      }
      setErr("");
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: (error) => {
      setErr((error as Error).message);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (password.length < 8)
        throw new Error("Geslo mora imeti vsaj 8 znakov.");
      if (password !== passwordConfirm) throw new Error("Gesla se ne ujemata!");

      mutate({ token: token!, email, password, passwordConfirm, phoneNumber });
    } catch (error) {
      setErr((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 lg:mx-auto lg:w-2/5">
        <p className="flex items-center gap-4 text-lg font-semibold lg:text-xl">
          Podatki za prijavo v spletno aplikacijo Bolderaj
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Elektronski naslov*</label>
            <input
              type="text"
              placeholder="Vnesite elektronski naslov"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Geslo*</label>
              <input
                type="password"
                placeholder="Vnesite geslo"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Potrdite geslo*</label>
              <input
                type="password"
                placeholder="Ponovno vnesite geslo"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Telefonska številka</label>
            <input
              type="text"
              placeholder="Vnesite vašo telefonsko številko"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
              autoComplete="off"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          {err && <p className="font-medium text-red-500">{err}</p>}
          {success && (
            <p className="text-primary font-medium">
              Uspešno ste nastavili vpisne podatke! V kratkem vas bomo
              preusmerili na vpisno stran.
            </p>
          )}
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? (
              "..."
            ) : (
              <p className="flex items-center gap-10">
                Potrdi podatke za vpis
                <span>
                  <ChevronRightIcon className="h-4 stroke-3" />
                </span>
              </p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetChildAuthForm;
