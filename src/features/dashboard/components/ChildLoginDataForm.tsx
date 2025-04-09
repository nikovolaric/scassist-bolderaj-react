import { FormEvent, useState } from "react";
import { IChild } from "./MyKids";
import { useMutation } from "@tanstack/react-query";
import { sendChildAuthMail } from "../../../services/authAPI";

function ChildLoginDataForm({ child }: { child: IChild }) {
  const { email, password, _id } = child;
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: sendChildAuthMail,
    onSuccess: (data) => {
      if (data instanceof Error) {
        throw data;
      }
      setIsOpen(false);
    },
    onError: (error) => {
      setErr((error as Error).message);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate({ id: _id, email: childEmail });
  }

  return (
    <div className="flex flex-col gap-8 lg:mx-auto lg:w-3/4">
      <p className="font-medium">Podatki za prijavo v otrokov profil</p>
      <form className="flex flex-col gap-14">
        {password && email && (
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-5 lg:gap-x-16">
            <div className="flex flex-col gap-1.5">
              <label>Elektronski naslov*</label>
              <input
                type="text"
                required
                autoComplete="off"
                disabled={true}
                value={email}
                placeholder="Vnesite otrokov elektronski naslov"
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label>Geslo*</label>
                <input
                  type="password"
                  required
                  autoComplete="off"
                  disabled={true}
                  value="************"
                  placeholder="Nastavite geslo za prijavo otroka"
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}
        {!password && !isOpen && (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            onClick={() => setIsOpen(true)}
          >
            Pošlji podatke za prijavo
          </button>
        )}
      </form>
      {isOpen && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label>Otrokov elektronski naslov*</label>
            <input
              type="text"
              required
              autoComplete="off"
              placeholder="Vnesite ortrokov elektronski naslov"
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none disabled:cursor-not-allowed"
              onChange={(e) => setChildEmail(e.target.value)}
            />
          </div>
          {err && <p className="font-medium text-red-500">{err}</p>}
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer self-end rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "..." : "Pošlji"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ChildLoginDataForm;
