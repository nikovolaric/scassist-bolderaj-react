import SetQuantity from "./SetQuantity";

export interface ITicket {
  name: string;
  priceDDV: number;
  morning: boolean;
  type: string;
  _id: string;
}

function TicketCard({ ticket }: { ticket: ITicket }) {
  const { name, morning, priceDDV, _id } = ticket;

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-6">
      <h1 className="font-quicksand text-lg font-bold uppercase">{name}</h1>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm">
          {morning ? "Koriščenje vstopnice: vsak dan, vstop do 14.00" : ""}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <p>Cena vstopnice:</p>
        <p className="bg-primary w-20 rounded-lg py-3 text-center text-xl font-semibold">
          {priceDDV.toFixed(2).split(".").join(",")}€
        </p>
      </div>
      <SetQuantity id={_id} />
    </div>
  );
}

export default TicketCard;
