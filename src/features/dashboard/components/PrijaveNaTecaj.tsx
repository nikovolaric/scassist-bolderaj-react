import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";

function PrijaveNaTecaj({ me }: { me: { parentOf?: { child: string }[] } }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 md:py-10 lg:h-[300px] xl:h-[364px] xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        AKTIVNOSTI IN VADBE
      </p>
      <p className="md:h-20 lg:h-24 xl:h-28 xl:text-xl">
        V Bolderaju poteka več različnih vadb in tečajev, ki so primerni tako za
        začetnike kot tudi izkušene plezalce.
      </p>
      <div className="self-end">
        <LinkBtn
          to={
            me.parentOf && me.parentOf.length > 0
              ? "/dashboard/classes/pickuser"
              : "/dashboard/classes"
          }
          type="primary"
        >
          <p className="flex items-center gap-2">
            Izbiraj in se prijavi <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default PrijaveNaTecaj;
