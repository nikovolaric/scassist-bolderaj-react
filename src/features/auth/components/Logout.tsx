import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FormEvent } from "react";
import { logout } from "../../../services/authAPI";
import { Navigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";

function Logout() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: logout,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate();
  }

  if (isPending) {
    return <Spinner />;
  }

  if (data && data.status === "success") {
    setTimeout(function () {
      return <Navigate to="/" replace />;
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-lg border border-black px-3 py-2.5 font-semibold transition-colors duration-300 hover:border-black/0">
        <span>
          <ChevronLeftIcon className="h-4 stroke-3" />
        </span>
        Odjavi se
      </button>
    </form>
  );
}

export default Logout;
