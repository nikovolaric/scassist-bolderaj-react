import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { resetPassword } from "../../../services/authAPI";

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (password.length < 8)
        throw new Error("Geslo mora imeti vsaj 8 znakov.");
      if (password !== passwordConfirm) throw new Error("Gesla se ne ujemata!");

      const result = await resetPassword(token!, password, passwordConfirm);

      if (result instanceof Error) {
        throw result;
      }

      setErr("");
      setSuccess(
        "Geslo uspešno ponastavljeno. Kmalu vas bomo preusmerili na vpisno stran.",
      );
      setTimeout(function () {
        navigate("/");
      }, 3000);
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold lg:text-3xl">
        Nastavite novo geslo
      </h1>
      <p className="font-medium lg:w-1/2">
        Ustvarite novo geslo, s katerim boste lahko dostopali do svojega računa
        v aplikaciji Bolderaj.
      </p>
      <form className="flex flex-col gap-5 lg:w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Nastavite novo geslo*</label>
          <input
            type="password"
            placeholder="Vnesite svoje svoj elektornski naslov"
            className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
            autoComplete="off"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Potrdite novo geslo*</label>
          <input
            type="password"
            placeholder="Vnesite svoje svoj elektornski naslov"
            className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
            autoComplete="off"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        {err && <p className="font-medium text-red-500">{err}</p>}
        {success && <p>{success}</p>}
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Ponastavi geslo"}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
