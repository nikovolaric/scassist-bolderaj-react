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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 rounded-xl bg-white px-4 py-8">
            <p className="font-quicksand text-lg font-bold uppercase">
              {article.name}
            </p>
            {article.endDate && (
              <p>
                <span className="font-semibold">Trajanje: </span>{" "}
                {new Date().toLocaleDateString()} -{" "}
                {new Date(article.endDate).toLocaleDateString()}
              </p>
            )}
            <p className="bg-primary/35 rounded-xl px-4 py-3">
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
        <div className="bg-neutral fixed bottom-0 left-0 flex h-20 w-full items-center justify-end px-4">
          <LinkBtn to={`${pathname}/payment`} type="primary">
            <p className="flex items-center gap-4">
              Nadaljuj na plačilo <ChevronRightIcon className="w-6 stroke-3" />
            </p>
          </LinkBtn>
        </div>
      )}
      {!article.noClasses && classData.classes.length === 1 && (
        <div className="bg-neutral fixed bottom-0 left-0 flex h-20 w-full items-center justify-end px-4">
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
