import NakupVstopnice from "./NakupVstopnice";
import PrijaveNaTecaj from "./PrijaveNaTecaj";

function WelcomeSection({ ticketsPage }: { ticketsPage?: boolean }) {
  return (
    <section className="flex flex-col gap-12">
      {!ticketsPage && (
        <h1 className="text-2xl font-semibold lg:text-3xl">
          Dobrodošli v Bolderaj!
        </h1>
      )}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-x-5">
        <NakupVstopnice />
        <PrijaveNaTecaj />
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
