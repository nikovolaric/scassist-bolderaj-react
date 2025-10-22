import { useTranslation } from "react-i18next";

export interface IVisit {
  _id: string;
  date: string;
  ticket: {
    name: {
      sl: string;
      en: string;
    };
  };
}

function MyVisitsCard({ visit }: { visit: IVisit }) {
  const { t, i18n } = useTranslation("common");
  const { date, ticket } = visit;

  return (
    <div>
      <p className="font-medium">
        {new Date(date).toLocaleDateString("sl-SI", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        , {t("at")} {new Date(date).toLocaleTimeString("sl-SI")}
      </p>
      <progress value={1} max={1} />
      <p>
        <span className="font-medium">{t("dashboard.usedTicket")}:</span>{" "}
        {ticket.name[i18n.language as keyof typeof ticket.name]}
      </p>
    </div>
  );
}

export default MyVisitsCard;
