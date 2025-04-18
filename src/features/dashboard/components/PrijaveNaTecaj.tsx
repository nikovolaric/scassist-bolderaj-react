import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import { useLocation } from "react-router";

function PrijaveNaTecaj() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 md:py-10 lg:h-[300px] xl:h-[364px] xl:gap-12">
      <p className="font-quicksand text-lg font-bold">TEČAJI IN VADBE</p>
      <p className="lg:h-24 xl:h-28 xl:text-xl">
        V Bolderaju poteka več različnih vadb in tečajev, ki so primerni tako za
        začetno kot za napredno stopnjo plezanja.
      </p>
      <div className="self-end">
        <LinkBtn
          to={`${pathname.includes("child") ? pathname : "/dashboard"}/classes`}
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
