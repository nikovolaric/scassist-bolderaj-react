import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../../components/LinkBtn";
import { useParams } from "react-router";

export interface IClassArticle {
  _id: string;
  name: {
    sl: string;
    en: string;
  };
  startDate: string;
  endDate: string;
  priceDDV: number;
  classPriceData: {
    priceDDV: number;
  };
  noClasses?: number;
}

function ClassCard({ classInfo }: { classInfo: IClassArticle }) {
  const { childId } = useParams();
  const { name, endDate, classPriceData, _id, priceDDV } = classInfo;

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white px-4 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="font-quicksand text-lg font-bold uppercase">
          {name.sl}
        </h1>
        <p>
          <span className="font-semibold">Trajanje: </span>
          {endDate
            ? `${new Date().toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
            : "Aktivnost se izvede v enem od razpisanih terminov."}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="bg-primary/35 flex items-center justify-between rounded-lg px-6 py-3">
          Cena:
          <span className="font-semibold">
            {!endDate
              ? priceDDV.toFixed(2).replace(".", ",")
              : classPriceData.priceDDV.toFixed(2).replace(".", ",")}{" "}
            €
          </span>
        </p>
        <div className="self-end">
          <LinkBtn
            to={`/dashboard/${childId ? `child/${childId}/` : ""}classes/${_id}`}
            type="primary"
          >
            <p className="flex items-center justify-end gap-12">
              Izberi termin in se prijavi
              <ChevronRightIcon className="w-4 flex-none stroke-3" />
            </p>
          </LinkBtn>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
