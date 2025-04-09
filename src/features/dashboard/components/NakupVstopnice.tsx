import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import { useLocation } from "react-router";

function NakupVstopnice() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:h-[300px] lg:py-10 xl:h-[364px] xl:gap-12">
      <p className="font-quicksand text-lg font-bold">NAKUP VSTOPNICE</p>
      <p className="lg:h-24 xl:h-28 xl:text-xl">
        Izbirate lahko med dnevno vstopnico, med paketom obiskov in terminsko
        vstopnico.
      </p>
      <div className="self-end">
        <LinkBtn
          to={`${pathname.includes("child") ? pathname : "/dashboard"}/tickets`}
          type="primary"
        >
          <p className="flex items-center gap-2">
            Nakupuj vstopnice <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default NakupVstopnice;
