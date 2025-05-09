import { ITicket } from "../../tickets/components/TicketCard";
import SetGiftQuantity from "./SetGiftQuantity";

function GiftCard({ article }: { article: ITicket }) {
  const { name, priceDDV, _id } = article;

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-6">
      <h1 className="font-quicksand text-lg font-bold uppercase">{name.sl}</h1>
      <div className="bg-primary/35 mt-auto flex items-center justify-between rounded-lg px-6 py-3">
        <p>Cena darilnega bona:</p>
        <p className="text-center font-semibold">
          {priceDDV.toFixed(2).split(".").join(",")}€
        </p>
      </div>
      <SetGiftQuantity id={_id} />
    </div>
  );
}

export default GiftCard;
