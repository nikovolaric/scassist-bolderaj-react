import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { logout } from "../../../services/authAPI";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = await logout();

      if (data.status === "success") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        className="hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-lg border border-black px-3 py-2.5 font-semibold transition-colors duration-300 hover:border-black/0"
        disabled={isLoading}
      >
        {isLoading ? (
          "..."
        ) : (
          <>
            <span>
              <ChevronLeftIcon className="h-4 stroke-3" />
            </span>
            Odjavi se
          </>
        )}
      </button>
    </form>
  );
}

export default Logout;
