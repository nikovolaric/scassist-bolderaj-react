import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import LinkBtn from "./LinkBtn";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/userAPI";
import { Navigate } from "react-router";

function Header() {
  const { data, isPending } = useQuery({ queryKey: ["me"], queryFn: getMe });

  if (!isPending && !data?.firstName) {
    return <Navigate to={"/"} />;
  }

  return (
    <header className="flex flex-col gap-14 lg:gap-20">
      <div className="flex items-center justify-between">
        <div className="w-1/2 md:w-1/3 lg:w-1/6">
          <Logo />
        </div>
        <NavMenu />
      </div>
      <div>
        <LinkBtn type="backBtn">
          <p className="flex items-center gap-4">
            <ChevronLeftIcon className="h-4 stroke-3" />
            Nazaj
          </p>
        </LinkBtn>
      </div>
    </header>
  );
}

export default Header;
