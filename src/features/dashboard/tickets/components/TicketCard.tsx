import SetQuantity from "./SetQuantity";

export interface ITicket {
  name: string;
  priceDDV: number;
  morning: boolean;
  type: string;
  _id: string;
}

function TicketCard({ ticket }: { ticket: ITicket }) {
  const { name, priceDDV, _id } = ticket;

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-6">
      <h1 className="font-quicksand text-lg font-bold uppercase">{name}</h1>
      <div className="bg-primary/35 mt-auto flex items-center justify-between rounded-lg px-6 py-3">
        <p>Cena vstopnice:</p>
        <p className="text-center text-xl font-semibold">
          {priceDDV.toFixed(2).split(".").join(",")}€
        </p>
      </div>
      <SetQuantity id={_id} />
    </div>
  );
}

export default TicketCard;
