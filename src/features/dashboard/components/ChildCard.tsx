import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { IChild } from "./MyKids";
import { useState } from "react";
import ChildLoginDataForm from "./ChildLoginDataForm";

function ChildCard({ child }: { child: IChild }) {
  const [isOpen, setIsOpen] = useState(false);
  const { firstName, lastName, birthDate, address, city, postalCode, country } =
    child;

  return (
    <div className="flex flex-col gap-16 rounded-xl bg-white px-4 py-7 lg:px-6 lg:py-9">
      <div className="flex items-center gap-4 lg:gap-12">
        <img
          src="/icons/userIcon.svg"
          alt="Ikona uporabnika"
          className="w-10 flex-none"
        />
        <p className="text-lg font-medium">
          {firstName} {lastName}
        </p>
        <button
          className="from-primary to-secondary drop-shadow-btn hover:to-primary ml-auto cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <ChevronRightIcon
            className={`h-4 stroke-3 ${isOpen ? "rotate-90" : ""} transition-[rotate] duration-150`}
          />
        </button>
      </div>
      {isOpen && (
        <>
          <div className="flex flex-col gap-8 lg:mx-auto lg:w-3/4">
            <p className="font-semibold">Osebni podatki</p>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Ime</label>
                  <input
                    type="text"
                    value={firstName}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Priimek</label>
                  <input
                    type="text"
                    value={lastName}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Datum rojstva</label>
                  <input
                    type="text"
                    value={new Date(birthDate).toLocaleDateString()}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                  <div className="hidden lg:block" />
                </div>
              </div>
              <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">
                    Naslov bivališča
                  </label>
                  <input
                    type="text"
                    value={address}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Kraj bivališča</label>
                  <input
                    type="text"
                    value={city}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:gap-x-16">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Poštna številka</label>
                  <input
                    type="text"
                    value={postalCode}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Država</label>
                  <input
                    type="text"
                    value={country}
                    disabled
                    className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </form>
          </div>
          <ChildLoginDataForm child={child} />
        </>
      )}
    </div>
  );
}

export default ChildCard;
