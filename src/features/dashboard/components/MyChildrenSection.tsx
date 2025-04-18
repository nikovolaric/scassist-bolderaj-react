import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import { getMyKids } from "../../../services/userAPI";
import LinkBtn from "../../../components/LinkBtn";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function MyChildrenSection() {
  const { data, isPending } = useQuery({
    queryKey: ["mykids"],
    queryFn: getMyKids,
  });

  if (isPending || !data) {
    return <Spinner />;
  }

  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-2xl font-semibold lg:text-3xl">
        Moji družinski člani
      </h1>
      <div className="flex flex-col gap-6 lg:gap-10">
        {data.map((el: { child: { firstName: string; id: string } }) => (
          <Child key={el.child.id} child={el.child} />
        ))}
      </div>
    </section>
  );
}

function Child({ child }: { child: { firstName: string; id: string } }) {
  const { firstName, id } = child;

  return (
    <div className="flex w-full items-center gap-6 rounded-xl bg-white px-6 py-7 lg:w-1/2">
      <img
        src="/icons/userIcon.svg"
        alt="User icon"
        className="w-8 object-cover lg:w-10"
      />
      <p className="text-lg font-bold uppercase lg:text-xl">{firstName}</p>
      <div className="ml-auto">
        <LinkBtn to={`/dashboard/child/${id}`} type="primary">
          <p className="md:flex md:items-center md:gap-4">
            <span className="hidden md:block">Odpri oglasno desko</span>
            <ChevronRightIcon className="w-4" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default MyChildrenSection;
