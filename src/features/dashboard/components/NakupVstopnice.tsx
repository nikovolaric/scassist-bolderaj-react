import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import {} from "@tanstack/react-query";

function NakupVstopnice({ me }: { me: { parentOf: { child: string }[] } }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:h-[300px] lg:py-10 xl:h-[364px] xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        NAKUP VSTOPNICE
      </p>
      <p className="md:h-20 lg:h-24 xl:h-28 xl:text-xl">
        Izbiraš lahko med dnevnimi vstopnicami, paketi obiskov in vstopnicami za
        daljše obdobje.
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
            Nakupuj vstopnice <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default NakupVstopnice;
