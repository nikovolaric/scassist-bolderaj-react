export interface IVisit {
  _id: string;
  date: string;
  ticket: {
    name: string;
  };
}

function MyVisitsCard({ visit }: { visit: IVisit }) {
  const { date, ticket } = visit;

  return (
    <div>
      <p className="font-medium">
        {new Date(date).toLocaleDateString("si-SL", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        , ob {new Date(date).toLocaleTimeString("si-SL")}
      </p>
      <progress value={1} max={1} />
      <p>
        <span className="font-medium">Koriščena vstopnica:</span> {ticket.name}
      </p>
    </div>
  );
}

export default MyVisitsCard;
