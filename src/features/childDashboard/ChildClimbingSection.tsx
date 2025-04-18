import { useQuery } from "@tanstack/react-query";
import ChildValidTickets from "./ChildValidTickets";
import ChildVisits from "./ChildVisits";
import { getMyChild } from "../../services/userAPI";
import { useParams } from "react-router";
import Spinner from "../../components/Spinner";
import ChildClasses from "./ChildClasses";

function ChildClimbingSection() {
  const { childId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  });

  if (isPending || !childId) {
    return <Spinner />;
  }

  const { firstName } = data.myChild;

  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-2xl font-semibold lg:text-3xl">
        Plezanje v Bolderaju za otroka {firstName}
      </h1>
      <div className="flex flex-col gap-12 gap-x-5 md:grid md:grid-cols-2 xl:grid-cols-3">
        <ChildValidTickets />
        <ChildVisits />
        <ChildClasses />
      </div>
    </section>
  );
}

export default ChildClimbingSection;
