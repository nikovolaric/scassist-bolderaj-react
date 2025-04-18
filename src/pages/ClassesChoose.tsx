import { Link, useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getOneArticle } from "../services/articlesAPI";
import Spinner from "../components/Spinner";
import ChooseMultipleDates from "../features/dashboard/classes/components/ChooseMultipleDates";
import ChooseSingleDateClass from "../features/dashboard/classes/components/ChooseSingleDateClass";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../app/hooks";
import { getClassCart } from "../features/dashboard/classes/slices/classCartSlice";
import LinkBtn from "../components/LinkBtn";
import Header from "../components/Header";

function ClassesChoose() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const classData = useAppSelector(getClassCart);
  const { data, isPending } = useQuery({
    queryKey: ["article"],
    queryFn: () => getOneArticle(id!),
  });

  if (isPending) {
    return <Spinner />;
  }

  const { article } = data;

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="flex items-center gap-4 text-2xl font-semibold">
          <Link to="/dashboard/classes">Tečaji in vadbe</Link>{" "}
          <ChevronRightIcon className="w-6 stroke-3" /> Prijava
        </h1>
        <div className="flex flex-col gap-6 lg:mx-auto lg:w-3/4 xl:w-2/3">
          <div
            className={`flex flex-col gap-5 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:items-center`}
          >
            <p
              className={`font-quicksand text-lg font-bold uppercase ${article.endDate ? "md:col-span-2" : ""}`}
            >
              {article.name}
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
        <div className="bg-neutral fixed bottom-0 left-0 flex h-20 w-full items-center justify-end px-4 md:px-8 lg:px-20 xl:left-1/2 xl:max-w-[1440px] xl:-translate-x-1/2">
          <LinkBtn to={`${pathname}/payment`} type="primary">
            <p className="flex items-center gap-4">
              Nadaljuj na plačilo <ChevronRightIcon className="w-6 stroke-3" />
            </p>
          </LinkBtn>
        </div>
      )}
      {!article.noClasses && classData.classes.length === 1 && (
        <div className="bg-neutral fixed bottom-0 left-0 flex h-20 w-full items-center justify-end px-4 md:px-8 lg:px-20 xl:left-1/2 xl:max-w-[1280px] xl:-translate-x-1/2">
          <LinkBtn to={`${pathname}/payment`} type="primary">
            <p className="flex items-center gap-4">
              Nadaljuj na plačilo <ChevronRightIcon className="w-6 stroke-3" />
            </p>
          </LinkBtn>
        </div>
      )}
    </div>
  );
}

export default ClassesChoose;
