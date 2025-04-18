import { useQuery } from "@tanstack/react-query";
import { getMyClasses } from "../../../../services/classAPI";
import Spinner from "../../../../components/Spinner";
import { getMyUnpaiedPreInvoices } from "../../../../services/preInvoiceAPI";
import { IClassInfo } from "./ChooseClassCard";

function MyClassesInfo() {
  const { data: classesData, isPending: isPendingClass } = useQuery({
    queryKey: ["myclasses"],
    queryFn: () => getMyClasses(),
  });
  const { data: preInvoiceData, isPending: isPendingPre } = useQuery({
    queryKey: ["preInvoices"],
    queryFn: getMyUnpaiedPreInvoices,
  });

  if (isPendingClass || isPendingPre) {
    return <Spinner />;
  }

  const { classes } = classesData;
  const { preInvoices } = preInvoiceData;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-semibold">Moji tečaji in vadbe</h1>
      <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-8 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4 md:px-8 lg:gap-x-14 xl:grid-cols-3 2xl:grid-cols-4">
        {classes.map((classinfo: IClassInfo) => (
          <MyClass
            key={classinfo._id}
            classinfo={classinfo}
            preInvoices={preInvoices}
          />
        ))}
      </div>
    </div>
  );
}

function MyClass({
  classinfo,
  preInvoices,
}: {
  classinfo: IClassInfo;
  preInvoices: { classes: string[] }[];
}) {
  if (!classinfo) {
    return <Spinner />;
  }

  const isNotPaid =
    preInvoices.filter((el) => el.classes.includes(classinfo._id)).length > 0;

  return (
    <div className="bg-neutral border-gray/80 flex flex-col gap-6 rounded-xl border px-3 py-4">
      <p className="font-semibold">
        {classinfo.className}
        {classinfo.dates.length > 1 ? " - vodena vadba" : ""}
      </p>
      <div className="flex flex-col gap-4">
        <p className={classinfo.dates.length === 1 ? "" : "capitalize"}>
          <span className="font-semibold normal-case">Termin izvajanja: </span>
          {classinfo.dates.length === 1
            ? `${new Date(classinfo.dates[0]).toLocaleDateString()}, od ${classinfo.hours.join(" - ")}`
            : `${new Date(classinfo.dates[0]).toLocaleDateString("si-SL", {
                weekday: "long",
              })}, ${classinfo.hours.join(" - ")}`}
        </p>
        {classinfo.dates.length > 1 && (
          <p>
            <span className="font-semibold">Trajanje: </span>
            {`${new Date(classinfo.dates[0]).toLocaleDateString()} - ${new Date(classinfo.dates[classinfo.dates.length - 1]).toLocaleDateString()}`}
          </p>
        )}
        {isNotPaid && (
          <p className="self-end font-semibold text-red-500">
            Plačilo še ni poravnano.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyClassesInfo;
