import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import TicketCardInfo from "../visitsTicketsAndClasses/TicketCardInfo";

function MyTickets() {
  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        MOJE VSTOPNICE
      </p>
      <TicketCardInfo />
      <div className="mt-auto self-end">
        <LinkBtn to="/dashboard/mytickets" type="primary">
          <p className="flex items-center gap-2">
            Oglej si vse vstopnice <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default MyTickets;
