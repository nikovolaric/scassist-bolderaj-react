import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import UserBox from "./UserBox";
import NavMenu from "./NavMenu";

function UserBoxBar({ btn, btnTo }: { btn: string; btnTo: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <LinkBtn to={btnTo} type="secondary">
          <p className="flex items-center gap-2">
            <span>
              <ChevronLeftIcon className="h-4 stroke-3" />
            </span>
            {btn}
          </p>
        </LinkBtn>
      </div>
      <div className="flex items-center gap-3">
        <UserBox />
        <NavMenu />
      </div>
    </div>
  );
}

export default UserBoxBar;
