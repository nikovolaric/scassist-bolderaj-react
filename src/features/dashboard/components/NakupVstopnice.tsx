import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import { useTranslation } from "react-i18next";

function NakupVstopnice({ me }: { me: { parentOf: { child: string }[] } }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:h-[300px] lg:py-10 xl:h-[364px] xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        {t("dashboard.buyTickets")}
      </p>
      <p className="md:h-20 lg:h-24 xl:h-28 xl:text-xl">
        {t("dashboard.buyTicketsText")}
      </p>
      <div className="self-end">
        <LinkBtn
          to={
            me.parentOf && me.parentOf.length > 0
              ? "/dashboard/tickets/pickuser"
              : "/dashboard/tickets"
          }
          type="primary"
        >
          <p className="flex items-center gap-2">
            {t("dashboard.buyTicketsBtn")}{" "}
            <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default NakupVstopnice;
