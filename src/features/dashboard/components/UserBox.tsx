import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getMyChild } from "../../../services/userAPI";

interface IUser {
  firstName: string;
  lastName: string;
}

function UserBox() {
  const { pathname } = useLocation();
  const { childId } = useParams();
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<IUser>(["me"]);
  const [isOpenKids, setIsOpenKids] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  });

  if (isLoading) {
    return <p>...</p>;
  }

  function handleClick() {
    setIsOpenKids((isOpen) => !isOpen);
  }

  return (
    <div className="relative">
      <div className="drop-shadow-input border-gray relative z-10 flex h-11 min-w-48 items-center gap-3 rounded-lg border bg-white pr-12 pl-3">
        <img
          src="/icons/userIcon.svg"
          alt="user icon"
          className="w-6 flex-none"
        />
        <div>
          <p className="text-sm text-black/75">
            {pathname.includes("child") ? "Pogled za:" : "Pozdravljeni,"}
          </p>
          <p className="text-sm font-semibold">
            {!data
              ? `${me?.firstName} ${me?.lastName}`
              : data.myChild.firstName}
          </p>
        </div>
        {(pathname.endsWith("/tickets") || pathname.endsWith("/classes")) && (
          <ChevronDownIcon
            className="absolute right-4 w-4 cursor-pointer stroke-3 text-black/50"
            onClick={handleClick}
          />
        )}
      </div>
      {isOpenKids && (
        <Kids setIsOpenKids={setIsOpenKids} myFirstName={me?.firstName} />
      )}
    </div>
  );
}

function Kids({
  setIsOpenKids,
  myFirstName,
}: {
  setIsOpenKids: Dispatch<SetStateAction<boolean>>;
  myFirstName?: string;
}) {
  const { childId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const myKids = queryClient.getQueryData(["mykids"]);

  const subpage = pathname.split("/").pop();

  function handleClick(id: string) {
    setIsOpenKids(false);
    if (childId === id) {
      navigate(`/dashboard/${subpage !== "dashboard" ? subpage : ""}`);
    } else {
      navigate(
        `/dashboard/child/${id}/${subpage !== "dashboard" ? subpage : ""}`,
      );
    }
  }

  if (myKids && myKids instanceof Array) {
    return (
      <div className="drop-shadow-input border-gray absolute left-0 -mt-2 flex w-full flex-col gap-3 rounded-b-lg border bg-white px-3 pt-4 pb-3">
        {myKids.map(
          (kid: {
            child: {
              firstName: string;
              lastName: string;
              _id: string;
              age: string;
            };
            _id: string;
          }) => (
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() => handleClick(kid.child._id)}
              key={kid._id}
            >
              <img
                src="/icons/userIcon.svg"
                alt="user icon"
                className="w-6 flex-none"
              />
              {childId === kid.child._id ? (
                <p className="text-sm font-semibold">
                  {myFirstName},{" "}
                  <span className="text-black/50">{"(JAZ)"}</span>
                </p>
              ) : (
                <p className="text-sm font-semibold">
                  {kid.child.firstName},{" "}
                  <span className="text-black/50">{kid.child.age} let</span>
                </p>
              )}
            </div>
          ),
        )}
      </div>
    );
  }
}

export default UserBox;
