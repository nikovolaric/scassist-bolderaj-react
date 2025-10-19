import NakupVstopnice from "./NakupVstopnice";
import PrijaveNaTecaj from "./PrijaveNaTecaj";
import { useTranslation } from "react-i18next";

function WelcomeSection({
  data,
  ticketsPage,
}: {
  data: { firstName: string; parentOf: { child: string }[] };
  ticketsPage?: boolean;
}) {
  const { t } = useTranslation("common");

  return (
    <section className="flex flex-col gap-12">
      {!ticketsPage && (
        <h1 className="text-2xl font-semibold lg:text-3xl">
          {t("dashboard.greeting")}, {data.firstName}!
        </h1>
      )}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-6 xl:grid-cols-3">
        <NakupVstopnice me={data} />
        <PrijaveNaTecaj me={data} />
        <img
          src="/racePlaceholder.jpg"
          alt="Slika plezalke"
          className="h-64 w-full rounded-xl object-cover lg:h-[300px] xl:h-[364px]"
        />
      </div>
    </section>
  );
}

export default WelcomeSection;
