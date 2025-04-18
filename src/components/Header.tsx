import { useLocation } from "react-router";
import UserBoxBar from "../features/dashboard/components/UserBoxBar";
import Logo from "./Logo";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="flex flex-col gap-12">
      <div className="w-1/2 lg:w-1/6">
        <Logo />
      </div>
      <UserBoxBar
        btn="Nazaj"
        btnTo={
          pathname.split("/").slice(0, -1).length === 3 &&
          pathname.includes("child")
            ? "/dashboard"
            : pathname.split("/").slice(0, -1).join("/")
        }
      />
    </header>
  );
}

export default Header;
