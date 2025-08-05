import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMultipleDateClasses } from "../../../../services/classAPI";
import ChooseClassCard, { IClassInfo } from "./ChooseClassCard";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useParams } from "react-router";

function ChooseMultipleDates() {
  const { id, childId } = useParams();
  const queryClient = useQueryClient();

  const ageGroup = childId
    ? queryClient.getQueryData<{ myChild: { ageGroup: string; age: number } }>([
        "child",
        childId,
      ])!.myChild.ageGroup
    : undefined;

  const { data, isPending } = useQuery({
    queryKey: ["classesMultiple"],
    queryFn: () => getMultipleDateClasses(id!, ageGroup),
  });

  if (isPending) {
    return <p>...</p>;
  }

  const mondays = data.classes.filter(
    (el: { dates: string[] }) => new Date(el.dates[0]).getDay() === 1,
  );
  const tuesdays = data.classes.filter(
    (el: { dates: string[] }) => new Date(el.dates[0]).getDay() === 2,
  );
  const wednesdays = data.classes.filter(
    (el: { dates: string[] }) => new Date(el.dates[0]).getDay() === 3,
  );
  const thursdays = data.classes.filter(
    (el: { dates: string[] }) => new Date(el.dates[0]).getDay() === 4,
  );
  const fridays = data.classes.filter(
    (el: { dates: string[] }) => new Date(el.dates[0]).getDay() === 5,
  );
  const saturdays = data.classes.filter(
    (el: { dates: string[] }) => new Date(el.dates[0]).getDay() === 6,
  );

  if (data.classes.length === 0) {
    return (
      <div>
        <p className="text-xl font-semibold">
          Trenutno ni razpisanih datumov za vodene vadbe.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {mondays.length > 0 && (
        <RenderClasses classInfo={mondays} day="Ponedeljek" />
      )}
      {tuesdays.length > 0 && (
        <RenderClasses classInfo={tuesdays} day="Torek" />
      )}
      {wednesdays.length > 0 && (
        <RenderClasses classInfo={wednesdays} day="Sreda" />
      )}
      {thursdays.length > 0 && (
        <RenderClasses classInfo={thursdays} day="Četrtek" />
      )}
      {fridays.length > 0 && <RenderClasses classInfo={fridays} day="Petek" />}
      {saturdays.length > 0 && (
        <RenderClasses classInfo={saturdays} day="Sobota" />
      )}
    </div>
  );
}

function RenderClasses({
  classInfo,
  day,
}: {
  classInfo: IClassInfo[];
  day: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{day}</p>
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary cursor-pointer rounded-lg bg-gradient-to-r px-3 py-2 font-semibold transition-colors duration-300"
          onClick={handleClick}
        >
          <ChevronRightIcon
            className={`w-4 stroke-3 ${isOpen ? "rotate-90" : ""} transition-all duration-200`}
          />
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-12">
          {classInfo.map((el: IClassInfo) => (
            <ChooseClassCard key={el._id} classInfo={el} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChooseMultipleDates;
