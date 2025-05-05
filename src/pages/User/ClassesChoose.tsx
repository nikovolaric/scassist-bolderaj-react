import { Link, useLocation, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneArticle } from "../../services/articlesAPI";
import Spinner from "../../components/Spinner";
import ChooseMultipleDates from "../../features/dashboard/classes/components/ChooseMultipleDates";
import ChooseSingleDateClass from "../../features/dashboard/classes/components/ChooseSingleDateClass";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../app/hooks";
import { getClassCart } from "../../features/dashboard/classes/slices/classCartSlice";
import LinkBtn from "../../components/LinkBtn";
import Header from "../../components/Header";

function ClassesChoose() {
  const { pathname } = useLocation();
  const { id, childId } = useParams();
  const classData = useAppSelector(getClassCart);
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{
    firstName: string;
    parentOf: unknown[];
  }>(["me"])!;
  const child = queryClient.getQueryData<{
    myChild: { firstName: string; age: string };
  }>(["child"])?.myChild;
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(id!),
  });

  if (isPending) {
    return <Spinner />;
  }

  const { article } = data;

  return (
    <div className="my-16 flex flex-col">
      <Header />
      <div className="mt-10 flex flex-col lg:mt-16">
        <div>
          <h1 className="flex items-center gap-4 font-semibold">
            <Link
              to={`/dashboard${childId ? `/child/${childId}` : ""}/classes`}
            >
              Aktivnosti in vadbe
            </Link>{" "}
            <ChevronRightIcon className="w-4 stroke-3" /> Prijava
          </h1>
          {me.parentOf.length > 0 && (
            <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
              Nakupujem za:{" "}
              {!childId
                ? `${me.firstName} (jaz)`
                : `${child?.firstName} (${child?.age} let)`}
            </p>
          )}
        </div>
        <div className="mt-14 flex flex-col gap-6 lg:mx-auto lg:mt-20 lg:w-3/4 xl:w-2/3">
          <div
            className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:items-center`}
          >
            <p
              className={`font-quicksand text-lg font-bold uppercase ${article.endDate ? "md:col-span-2" : ""}`}
            >
              {article.name.sl}
            </p>
            {article.endDate && (
              <p>
                <span className="font-semibold">Trajanje: </span>{" "}
                {new Date().toLocaleDateString()} -{" "}
                {new Date(article.endDate).toLocaleDateString()}
              </p>
            )}
            <p className="bg-primary/35 rounded-xl px-4 py-3 md:justify-self-end">
              Cena:{" "}
              <span className="font-semibold">
                {(article.endDate
                  ? article.classPriceData.priceDDV
                  : article.priceDDV
                )
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                €
              </span>
            </p>
          </div>
          <p className="font-medium">Izberi termin in se prijavi</p>
          {!article.noClasses && <ChooseSingleDateClass />}
          {article.noClasses && <ChooseMultipleDates />}
        </div>
      </div>
      {classData.classes.length === article.noClasses && (
        <div className="bg-neutral fixed bottom-0 left-0 z-30 flex h-20 w-dvw items-center px-4 md:px-8 lg:px-20">
          <div className="mx-4 flex items-center justify-end md:mx-8 lg:mx-20 xl:mx-auto xl:w-[1280px]">
            <LinkBtn to={`${pathname}/payment`} type="primary">
              <p className="flex items-center gap-4">
                Nadaljuj na plačilo{" "}
                <ChevronRightIcon className="w-6 stroke-3" />
              </p>
            </LinkBtn>
          </div>
        </div>
      )}
      {!article.noClasses && classData.classes.length === 1 && (
        <div className="bg-neutral fixed bottom-0 left-0 z-30 flex h-20 w-dvw items-center px-4 md:px-8 lg:px-20">
          <div className="mx-4 flex items-center justify-end md:mx-8 lg:mx-20 xl:mx-auto xl:w-[1280px]">
            <LinkBtn to={`${pathname}/payment`} type="primary">
              <p className="flex items-center gap-4">
                Nadaljuj na plačilo{" "}
                <ChevronRightIcon className="w-6 stroke-3" />
              </p>
            </LinkBtn>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassesChoose;
