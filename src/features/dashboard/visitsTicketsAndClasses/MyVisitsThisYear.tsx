import { useQuery } from "@tanstack/react-query";
import { getYearlyVisitNo } from "../../../services/visitsAPI";
import Spinner from "../../../components/Spinner";
import { useState } from "react";

function MyVisitsThisYear() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());

  const { data, isPending } = useQuery({
    queryKey: ["yearlyVisits", year],
    queryFn: () => getYearlyVisitNo(Number(year)),
    placeholderData: true,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-9 rounded-lg bg-white px-5 py-8">
      <div className="flex items-center gap-2">
        <p className="font-quicksand text-lg font-bold lg:text-xl">
          OBISKI V LETU
        </p>
        <select
          onChange={(e) => setYear(e.target.value)}
          className="text-lg font-bold outline-none lg:text-xl"
        >
          {Array.from({ length: new Date().getFullYear() - 2024 }).map(
            (_, i) => (
              <option key={(i + 1) * 10} value={currentYear - i}>
                {currentYear - i}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="flex flex-col gap-6 text-center">
        <p className="text-lg font-medium">V Bolderaju ste opravili</p>
        <p className="font-quicksand bg-primary mx-auto w-fit rounded-lg px-6 py-1 font-bold">
          {data.results} OBISKOV
        </p>
      </div>
    </div>
  );
}

export default MyVisitsThisYear;
