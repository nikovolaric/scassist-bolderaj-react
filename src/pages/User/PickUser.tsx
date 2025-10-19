import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/Header";
import { getMyKids } from "../../services/userAPI";
import Spinner from "../../components/Spinner";
import { ChangeEvent, useState } from "react";
import LinkBtn from "../../components/LinkBtn";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

function PickUser() {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();
  const [isChecked, setIsChecked] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["mykids"],
    queryFn: getMyKids,
  });
  const me = queryClient.getQueryData<{ firstName: string }>(["me"]);

  if (isLoading) {
    return <Spinner />;
  }

  const ticket = pathname.includes("tickets");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.value);
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="text-2xl font-semibold lg:text-3xl">
          {ticket ? t("pickUser.buy") : t("pickUser.buyClasses")}
        </h1>
        <div className="flex flex-col gap-2 lg:mx-auto lg:w-2/3">
          <p className="font-medium">
            {ticket ? t("pickUser.buyingFor") : t("pickUser.signingUpFor")}
          </p>
          <div className="flex flex-col gap-8 rounded-xl bg-white px-8 py-8 md:px-14">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isChecked === ""}
                  onChange={handleChange}
                  value=""
                />
                <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                  <span
                    className={`${isChecked === "" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                  />
                </div>
              </label>
              <p className="font-semibold">
                {me?.firstName} <span className="font-normal">({t("pickUser.me")})</span>
              </p>
            </div>
            {data.map(
              (childData: {
                child: { firstName: string; _id: string; age: string };
              }) => (
                <div
                  className="flex items-center gap-3"
                  key={childData.child._id}
                >
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      checked={isChecked === childData.child._id}
                      onChange={handleChange}
                      value={childData.child._id}
                    />
                    <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                      <span
                        className={`${isChecked === childData.child._id ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                      />
                    </div>
                  </label>
                  <p className="font-semibold">
                    {childData.child.firstName},
                    <span className="font-normal">
                      {" "}
                      {childData.child.age} {t("pickUser.years")}
                    </span>
                  </p>
                </div>
              ),
            )}
          </div>
          <div className="mt-12 self-end">
            <LinkBtn
              to={
                isChecked === ""
                  ? `/dashboard/${ticket ? "tickets" : "classes"}`
                  : `/dashboard/child/${isChecked}/${ticket ? "tickets" : "classes"}`
              }
              type="primary"
            >
              <p className="flex items-center gap-2">
                {ticket ? t("pickUser.continueTickets") : t("pickUser.continueClasses")}{" "}
                <ChevronRightIcon className="h-4 stroke-3" />
              </p>
            </LinkBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickUser;
