import { FormEvent, useState } from "react";
import { sendResetToken } from "../../../services/authAPI";

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const result = await sendResetToken(email);

      if (result instanceof Error) {
        throw result;
      }

      setErr("");
      setSuccess(true);
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold lg:text-3xl">Pozabljeno geslo</h1>
      <p className="font-medium lg:w-1/2">
        Vnesite elektronski naslov za obnovitev gesla.
      </p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Elektronski naslov <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Vnesite svoj elektronski naslov"
            className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
            autoComplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {err && <p className="font-medium text-red-500">{err}</p>}
        {success ? (
          <div className="border-secondary flex flex-col items-start gap-3 rounded-lg border bg-white px-4 py-5">
            <p className="from-primary to-secondary drop-shadow-input rounded-lg bg-gradient-to-t px-2.5">
              i
            </p>
            <p>
              V kolikor niste prejeli maila za ponastavitev gesla, se prosimo
              obrnite na mail podpora@bolderaj.si.
            </p>
          </div>
        ) : (
          <button
            className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Pošlji mail za ponastavitev gesla"}
          </button>
        )}
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
