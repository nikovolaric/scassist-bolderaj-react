import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { loginAction } from "../../../services/authAPI";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../services/userAPI";

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, isPending } = useQuery({ queryKey: ["me"], queryFn: getMe });

  if (!isPending && data?.firstName) {
    return <Navigate to={"/dashboard"} />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const data = await loginAction({ email, password });

      if (data.status !== "success") {
        throw Error(data.message);
      }

      navigate("/dashboard");
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Prijavi se v svoj račun</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Elektronski naslov</label>
          <input
            type="text"
            placeholder="Vnesi elektronski naslov"
            name="email"
            className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Geslo</label>
          <input
            type="password"
            placeholder="Vnesi geslo"
            className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
            autoComplete="off"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/forgotpassword" className="text-secondary text-sm font-bold">
          Pozabljeno geslo
        </Link>
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Prijavi se"}
        </button>
        {err && <p className="font-medium text-red-500">{err}</p>}
      </form>
      <p className="text-center text-sm">
        Še nisi ustvaril Bolderaj računa?{" "}
        <Link to="/signup" className="text-secondary font-bold">
          Registriraj se
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
