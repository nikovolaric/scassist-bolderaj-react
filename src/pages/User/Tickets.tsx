import DailyTickets from "../../features/dashboard/tickets/components/DailyTickets";
import LongtermTickets from "../../features/dashboard/tickets/components/LongtermTickets";
import PackageTickets from "../../features/dashboard/tickets/components/PackageTickets";
import Header from "../../components/Header";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyChild } from "../../services/userAPI";
import Spinner from "../../components/Spinner";

function Tickets() {
  const { childId } = useParams();
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{
    firstName: string;
    parentOf: unknown[];
  }>(["me"])!;
  const { data, isLoading } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <div>
          <h1 className="font-semibold">Nakup vstopnice</h1>
          {me.parentOf.length > 0 && (
            <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
              Nakupujem za:{" "}
              {!childId
                ? `${me.firstName} (jaz)`
                : `${data.myChild.firstName} (${data.myChild.age} let)`}
            </p>
          )}
        </div>
        <DailyTickets />
        <LongtermTickets />
        <PackageTickets />
      </div>
    </div>
  );
}

export default Tickets;
