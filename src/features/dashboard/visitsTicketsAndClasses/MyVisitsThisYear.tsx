import { useQuery } from "@tanstack/react-query";
import { getYearlyVisitNo } from "../../../services/visitsAPI";
import Spinner from "../../../components/Spinner";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { endOfDay, startOfYear } from "date-fns";

function MyVisitsThisYear() {
  const year = new Date().getFullYear().toString();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const { data, isPending } = useQuery({
    queryKey: ["yearlyVisits", endDate],
    queryFn: () => getYearlyVisitNo({ startDate, endDate }),
    placeholderData: true,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-9 rounded-lg bg-white px-5 py-8">
      <div className="relative flex items-center gap-2">
        <p className="font-quicksand text-lg font-bold lg:text-xl">
          OBISKI V OBDOBJU
        </p>
        <DatePicker
          selectsRange
          onCalendarOpen={() => {
            setStartDate(undefined);
            setEndDate(undefined);
          }}
          startDate={startDate}
          endDate={endDate}
          onChange={(dates: [Date | null, Date | null]) => {
            const toUTCDate = (date: Date) =>
              new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
              );
            const [start, end] = dates;

            if (start) {
              setStartDate(toUTCDate(start));
              setEndDate(undefined);
            }
            if (end) setEndDate(endOfDay(end));
          }}
          customInput={<CalendarDateRangeIcon className="h-8 cursor-pointer" />}
        />
        <div className="absolute top-full">
          {startDate && endDate ? (
            <p className="font-medium text-black/60 outline-none lg:text-lg">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </p>
          ) : (
            <p className="font-medium text-black/60 outline-none lg:text-lg">
              {startOfYear(year).toLocaleDateString()} -{" "}
              {new Date().toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 text-center">
        <p className="text-lg font-medium">Bolderaj si obiskal/a</p>
        <p className="font-quicksand bg-primary mx-auto w-fit rounded-lg px-6 py-1 font-bold">
          {data.results} KRAT
        </p>
      </div>
    </div>
  );
}

export default MyVisitsThisYear;
