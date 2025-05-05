import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  clearOneClass,
  getClassCart,
  setClasses,
} from "../slices/classCartSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IClassArticle } from "./ClassCard";
import { getChildClasses, getMyClasses } from "../../../../services/classAPI";
import Spinner from "../../../../components/Spinner";
import { useParams } from "react-router";

export interface IClassInfo {
  dates: string[];
  teacher: { firstName: string; lastName: string };
  students: string[];
  maxStudents: number;
  hours: string[];
  _id: string;
  className: {
    sl: string;
    en: string;
  };
  full: boolean;
}

function ChooseClassCard({ classInfo }: { classInfo: IClassInfo }) {
  const { dates, teacher, students, maxStudents, hours, className, full, _id } =
    classInfo;
  const { childId } = useParams();
  const queryClient = useQueryClient();
  const { article } = queryClient.getQueryData<{ article: IClassArticle }>([
    "article",
  ])!;
  const { data: myClasses, isPending } = useQuery({
    queryKey: ["myclasses"],
    queryFn: () => {
      if (childId) {
        return getChildClasses(childId!);
      } else {
        return getMyClasses();
      }
    },
  });
  const dispatch = useAppDispatch();
  const { classes } = useAppSelector(getClassCart);
  const [isChecked, setIsChecked] = useState(classes.includes(_id));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (classes.length < (article.noClasses || 1)) {
      setIsChecked(e.target.checked);
      dispatch(setClasses(_id));
    }

    if (classes.length > 0 && isChecked) {
      setIsChecked(e.target.checked);
      dispatch(clearOneClass(_id));
    }
  }

  if (isPending) {
    return <Spinner />;
  }

  const signedUp =
    myClasses.classes.filter((myclass: { _id: string }) => myclass._id === _id)
      .length === 1;

  if (dates.length === 1) {
    return (
      <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-8">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{className.sl}</p>
          {full && (
            <div className="bg-primary flex h-6 items-center justify-center rounded-lg border border-black/75 px-4">
              <span className="font-semibold">Polno</span>
            </div>
          )}
        </div>
        <p>
          <span className="font-semibold">Termin izvajanja: </span>
          {new Date(dates[0]).toLocaleDateString()}, od {hours.join(" - ")}
        </p>
        <p>
          <span className="font-semibold">Izvajalec tečaja: </span>
          {`${teacher.firstName} ${teacher.lastName}`}
        </p>
        <div>
          <p>
            <span className="font-semibold">Zasedenost: </span>
            {students.length} zasedenih mest od {maxStudents} mest
          </p>
          <progress value={students.length} max={maxStudents} />
        </div>
        {signedUp && !full && (
          <p className="flex items-center gap-6 font-semibold">
            <span className="from-primary to-secondary drop-shadow-input flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r">
              i
            </span>
            Na termin ste že prijavljeni
          </p>
        )}
        {full && !signedUp && (
          <p className="flex items-center gap-6 font-semibold">
            <span className="from-primary to-secondary drop-shadow-input flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r">
              i
            </span>
            Prijave na termin niso več mogoče
          </p>
        )}
        {!signedUp && !full && (
          <label className="cursor-pointer self-end">
            <input
              type="checkbox"
              className="peer hidden"
              checked={isChecked}
              onChange={handleChange}
              disabled={full}
            />
            <div className="from-primary to-secondary drop-shadow-btn peer-checked:from-gray peer-checked:to-gray rounded-lg bg-gradient-to-r px-6 py-2 font-semibold">
              {isChecked ? "Termin je izbran" : "Izberi termin"}
            </div>
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex items-start justify-between md:justify-center md:gap-4 ${full || signedUp ? "opacity-50" : ""}`}
      >
        <div>
          {full || signedUp ? (
            <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 opacity-0 transition-all duration-75 md:opacity-50"></div>
          ) : (
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isChecked}
                onChange={handleChange}
                disabled={full}
              />
              <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                <span
                  className={`${isChecked ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                />
              </div>
            </label>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{className.sl}</p>
          <p>
            <span className="font-semibold">Ura izvajanja: </span>{" "}
            {hours.join(" - ")}
          </p>
          <p>
            <span className="font-semibold">Izvajalec: </span>{" "}
            {teacher.firstName} {teacher.lastName}
          </p>
          <div>
            <p>
              <span className="font-semibold">Zasedenost: </span>
              {students.length} zasedenih mes od {maxStudents} mest
            </p>
            <progress value={students.length} max={maxStudents} />
          </div>
        </div>
      </div>
      {signedUp && !full && (
        <p className="flex items-center gap-6 self-center font-semibold">
          <span className="from-primary to-secondary drop-shadow-input flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r">
            i
          </span>
          Na termin ste že prijavljeni
        </p>
      )}
      {full && !signedUp && (
        <p className="flex items-center gap-6 self-center font-semibold">
          <span className="from-primary to-secondary drop-shadow-input flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r">
            i
          </span>
          Prijave na termin niso več mogoče
        </p>
      )}
    </div>
  );
}

export default ChooseClassCard;
