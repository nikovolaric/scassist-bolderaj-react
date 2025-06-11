import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import {
  clearCompanyInfo,
  setCompanyAddress,
  setCompanyCity,
  setCompanyName,
  setCompanyPostalCode,
  setCompanyTax,
} from "../../tickets/slices/ticketCartSlice";

function CompanyInvoiceForm() {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);

    if (!e.target.checked) {
      dispatch(clearCompanyInfo());
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="peer hidden"
            checked={isChecked}
            onChange={handleChange}
          />
          <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
            <span
              className={`${isChecked ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
            />
          </div>
        </label>
        <p className="font-medium">Želim račun na podjetje.</p>
      </div>
      {isChecked && <InvoiceForm />}
    </div>
  );
}

function InvoiceForm() {
  const dispatch = useAppDispatch();

  return (
    <form className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 px-6 xl:px-10">
      <div className="col-span-2 flex flex-col gap-1.5 lg:col-span-1">
        <label className="text-sm">Ime podjetja</label>
        <input
          placeholder="Podjetje, d.o.o."
          className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
          onChange={(e) => dispatch(setCompanyName(e.target.value))}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1.5 lg:col-span-1">
        <label className="text-sm">Ulica in hišna številka</label>
        <input
          placeholder="Ljubljanska cesta 1"
          className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
          onChange={(e) => dispatch(setCompanyAddress(e.target.value))}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1.5 lg:col-span-1">
        <label className="text-sm">Kraj</label>
        <input
          placeholder="Ljubljana"
          className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
          onChange={(e) => dispatch(setCompanyCity(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm">Poštna številka</label>
        <input
          placeholder="1000"
          className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
          onChange={(e) => dispatch(setCompanyPostalCode(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm">Davčna številka</label>
        <input
          placeholder="SI12345678"
          className="border-gray rounded-lg border px-3.5 py-1.5 shadow-sm outline-none"
          onChange={(e) => dispatch(setCompanyTax(e.target.value))}
        />
      </div>
    </form>
  );
}

export default CompanyInvoiceForm;
