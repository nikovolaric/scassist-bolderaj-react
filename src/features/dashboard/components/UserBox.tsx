import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

interface User {
  firstName: string;
  email: string;
}

function UserBox() {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<User>(["me"]);

  if (!me) {
    return <p>Nekaj je šlo narobe</p>;
  }

  return (
    <Link
      to="/dashboard/me"
      className="drop-shadow-input border-gray flex items-center gap-3 rounded-xl border bg-white px-3 py-1 lg:py-3"
    >
      <img
        src="/icons/userIcon.svg"
        alt="Ikona uporabnika"
        className="w-8 flex-none sm:w-10"
      />
      <div>
        <p className="font-quicksand font-bold">{me.firstName}</p>
        <p className="text-sm text-black/75">{me.email}</p>
      </div>
    </Link>
  );
}

export default UserBox;
