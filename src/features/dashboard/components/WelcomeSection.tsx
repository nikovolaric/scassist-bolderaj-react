import { useQueryClient } from "@tanstack/react-query";
import NakupVstopnice from "./NakupVstopnice";
import PrijaveNaTecaj from "./PrijaveNaTecaj";

function WelcomeSection({ ticketsPage }: { ticketsPage?: boolean }) {
  const queryClient = useQueryClient();

  const firstName = queryClient.getQueryData<{ firstName: string }>([
    "me",
  ])?.firstName;

  return (
    <section className="flex flex-col gap-12">
      {!ticketsPage && (
        <h1 className="text-2xl font-semibold lg:text-3xl">
          Dobrodošli v Bolderaj, {firstName}!
        </h1>
      )}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-6 xl:grid-cols-3">
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
