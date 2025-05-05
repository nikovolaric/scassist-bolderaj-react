import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import { useQueryClient } from "@tanstack/react-query";

function NakupVstopnice() {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{ parentOf: { child: string }[] }>([
    "me",
  ]);

  if (!me) {
    return <p>...</p>;
  }

  const parent = me.parentOf.length > 0;

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:h-[300px] lg:py-10 xl:h-[364px] xl:gap-12">
      <p className="font-quicksand text-lg font-bold">NAKUP VSTOPNICE</p>
      <p className="md:h-20 lg:h-24 xl:h-28 xl:text-xl">
        Izbirate lahko med dnevno vstopnico, med paketom obiskov in terminsko
        vstopnico.
      </p>
      <div className="self-end">
        <LinkBtn
          to={!parent ? "/dashboard/tickets" : "/dashboard/tickets/pickuser"}
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
