import { ChangeEvent, useState } from "react";
import Header from "../../components/Header";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../components/LinkBtn";

function PickAgeGroup() {
  const [isChecked, setIsChecked] = useState("preschool");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.value);
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <div>
          <h1 className="text-2xl font-semibold lg:text-3xl">
            Plezanje kot darilo
          </h1>
          <p className="mt-8 flex gap-4 font-semibold">
            <span className="from-primary to-secondary drop-shadow-btn flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
              i
            </span>
            Darilni bon je vezan na starostno skupino prejemnika. Vsi darilni
            boni veljajo eno leto od dneva nakupa.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:mx-auto lg:w-2/3">
          <p className="font-medium">
            Izberi starostno skupino prejemnika bona
          </p>
          <div className="flex flex-col gap-8 rounded-xl bg-white px-8 py-8 md:px-14">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isChecked === "preschool"}
                  onChange={handleChange}
                  value="preschool"
                />
                <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                  <span
                    className={`${isChecked === "preschool" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                  />
                </div>
              </label>
              <p className="font-semibold">3 - 5 let</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isChecked === "school"}
                  onChange={handleChange}
                  value="school"
                />
                <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                  <span
                    className={`${isChecked === "school" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                  />
                </div>
              </label>
              <p className="font-semibold">6 - 14 let</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isChecked === "student"}
                  onChange={handleChange}
                  value="student"
                />
                <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                  <span
                    className={`${isChecked === "student" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                  />
                </div>
              </label>
              <p className="font-semibold">15 - 25 let</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={isChecked === "adult"}
                  onChange={handleChange}
                  value="adult"
                />
                <div className="bg-neutral flex h-6 w-6 items-center justify-center rounded-lg border border-black/75 transition-all duration-75">
                  <span
                    className={`${isChecked === "adult" ? "bg-primary border-gray border" : ""} h-4 w-4 rounded-full`}
                  />
                </div>
              </label>
              <p className="font-semibold">Odrasli (+ 26 let)</p>
            </div>
          </div>
          <div className="mt-12 self-end">
            <LinkBtn to={`/dashboard/gifts/${isChecked}`} type="primary">
              <p className="flex items-center gap-2">
                Nadaljuj na darilne bone
                <ChevronRightIcon className="h-4 stroke-3" />
              </p>
            </LinkBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickAgeGroup;
