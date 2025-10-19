import { useTranslation } from "react-i18next";
import SetQuantity from "./SetQuantity";

export interface ITicket {
  name: Record<string, string>;
  priceDDV: number;
  morning: boolean;
  type: string;
  _id: string;
}

function TicketCard({ ticket }: { ticket: ITicket }) {
  const { t, i18n } = useTranslation("tickets");
  const { name, priceDDV, _id } = ticket;

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-6">
      <h1 className="font-quicksand text-lg font-bold uppercase">
        {name[i18n.language]}
      </h1>
      <div className="bg-primary/35 mt-auto flex items-center justify-between rounded-lg px-6 py-3">
        <p>{t("price")}:</p>
        <p className="text-center font-semibold">
          {priceDDV.toFixed(2).split(".").join(",")}€
        </p>
      </div>
      <SetQuantity id={_id} />
    </div>
  );
}

export default TicketCard;
