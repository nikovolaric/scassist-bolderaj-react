import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getSignUpData,
  setAddress,
  setAgreesToTerms,
  setBirthDate,
  setCity,
  setClimbingAbility,
  setCountry,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setPostalCode,
} from "../slices/signUpSlice";
import { useNavigate } from "react-router";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getSignUpData);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  // const [age, setAge] = useState<number>(100);
  const [err, setErr] = useState("");
  const [isOpenSub, setIsOpenSub] = useState(false);
  const [ability, setAbility] = useState(0);

  const climbingOptions = [
    "0 - brez plezalnega znanja",
    "1 - zelo lahko (3-4)",
    "2 - lahko (4-5B)",
    "3 - zmerno (5B-6A+)",
    "4 - srednje težko (6A+-6C)",
    "5 - težko (6C-7A+)",
    "6 - zelo težko (7A+-7C)",
    "7 - ekstremno (več kot 7C)",
  ];

  useEffect(() => {
    if (day && month && year) {
      const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
      const today = new Date();

      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        calculatedAge--;
      }

      if (calculatedAge < 18) {
        setErr(
          "Samostojna priajava je dovoljena osebam, starejšim od 18 let. Dostop mladoletnim osebam lahko v svojem profilu omogočijo starši ali skrbniki.",
        );
      } else {
        setErr("");
      }

      // setAge(calculatedAge);
      dispatch(setBirthDate(`${year}-${month}-${day}`));
    }
  }, [day, month, year, dispatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    navigate("/signup/end");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold lg:text-3xl">Registriraj se</h1>
      <div className="flex flex-col gap-8">
        <p className="font-medium">
          V kolikor želiš registrirati mladoletno osebo, se najprej registriraj
          kot starš oz. skrbnik, nato pa postopek registracije otroka prični v
          Moj profil.
        </p>
        <p className="flex items-center gap-4 text-lg font-semibold lg:text-xl">
          <span className="bg-primary rounded-lg border border-black px-2.5 py-0.5">
            1
          </span>
          Osebni podatki
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Ime<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vnesi svoje ime"
                value={userData.firstName}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                required
                onChange={(e) => dispatch(setFirstName(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Priimek<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vnesi svoj priimek"
                value={userData.lastName}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                required
                onChange={(e) => dispatch(setLastName(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Datum rojstva<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-between">
                <select
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  required
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">Dan</option>
                  {Array.from({ length: 31 }).map((_, i) => (
                    <option key={i} value={i > 9 ? i + 1 : `0${i + 1}`}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  required
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Mesec</option>
                  <option value="01">Januar</option>
                  <option value="02">Februar</option>
                  <option value="03">Marec</option>
                  <option value="04">April</option>
                  <option value="05">Maj</option>
                  <option value="06">Junij</option>
                  <option value="07">Julij</option>
                  <option value="08">Avgust</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  required
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Leto</option>
                  {Array.from({ length: new Date().getFullYear() - 1901 }).map(
                    (_, i) => (
                      <option
                        key={(i + 1) * 100}
                        value={new Date().getFullYear() - i - 1}
                      >
                        {new Date().getFullYear() - i - 1}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <div className="relative z-50 flex flex-col gap-1">
              <p className="text-sm font-medium">
                Plezalno znanje<span className="text-red-500">*</span>
              </p>
              <input
                className="drop-shadow-input border-gray w-full rounded-lg border bg-white px-3.5 py-2.5"
                placeholder="Izberi podkategorijo"
                disabled
                value={climbingOptions[ability]}
              />
              <ChevronDownIcon
                className={`absolute right-4 bottom-3 w-5 cursor-pointer stroke-2 ${isOpenSub ? "rotate-180" : ""}`}
                onClick={() => setIsOpenSub((isOpen) => !isOpen)}
              />
              {isOpenSub && (
                <div className="absolute top-[110%] left-0 flex w-full flex-col gap-2 rounded-lg border border-black/20 bg-white px-4 py-2 shadow-xs">
                  {climbingOptions.map((climbingOption, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className={`h-6 w-6 cursor-pointer rounded-lg border border-black/50 ${ability === i ? "bg-primary/50" : ""}`}
                        onClick={() => {
                          setAbility(i);
                          dispatch(setClimbingAbility(i));
                        }}
                      ></span>
                      {climbingOption}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Naslov bivališča</label>
              <input
                type="text"
                placeholder="Vnesi naslov bivališča"
                value={userData.address}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                onChange={(e) => dispatch(setAddress(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Kraj bivališča</label>
              <input
                type="text"
                placeholder="Vnesi kraj bivališča"
                value={userData.city}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                onChange={(e) => dispatch(setCity(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Poštna številka</label>
              <input
                type="text"
                placeholder="Vnesi poštno številko"
                value={userData.postalCode}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                onChange={(e) => dispatch(setPostalCode(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Država</label>
              <input
                type="text"
                placeholder="Vnesi državo bivališča"
                value={userData.country}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                onChange={(e) => dispatch(setCountry(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Telefonska številka</label>
              <input
                type="text"
                placeholder="Vnesi telefonsko številko"
                value={userData.phoneNumber}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
              />
            </div>
            <div />
          </div>
          <p>
            V kolikor v vnosna polja vnesete zahtevane osebne podatke in
            kliknete na gumb za oddajo registracije, bo družba Bolderaj d.o.o.
            vnesene podatke shranila in obdelovala za namene vodenja
            uporabniškega računa in nudenja pripadajočih funkcionalnosti
            aplikacije ter nekomercialnega obveščanja. Več glede obdelave
            osebnih podatkov si lahko preberete na tej{" "}
            <a
              href="https://bolderaj.si/varovanje-osebnih-podatkov/"
              target="_blank"
              className="cursor-pointer font-medium hover:underline"
            >
              povezavi
            </a>
            .
          </p>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agreesToterms"
              className="mt-1.5 cursor-pointer"
              checked={userData.agreesToTerms}
              required
              onChange={(e) =>
                dispatch(
                  setAgreesToTerms(e.target.value === "on" ? true : false),
                )
              }
            />
            <label className="font-medium">
              Prebral/-a sem in se strinjam s{" "}
              <a
                href="https://bolderaj.si/splosni-pogoji-poslovanja/"
                target="_blank"
                className="cursor-pointer font-bold hover:underline"
              >
                Splošnimi pogoji poslovanja
              </a>
              , ki med drugim urejajo nakupe in koriščenje vstopnic ter pristop
              k vodenim vadbam. <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agreesToterms"
              className="mt-1.5 cursor-pointer"
              checked={userData.agreesToTerms}
              required
            />
            <label className="font-medium">
              Prebral/-a sem in se strinjam s{" "}
              <a
                href="https://bolderaj.si/pravila-in-pogoji-uporabe-plezalnega-centra-bolderaj/"
                target="_blank"
                className="cursor-pointer font-bold hover:underline"
              >
                Pravili in pogoji uporabe
              </a>{" "}
              plezalnega centra Bolderaj, ki določajo hišni red in pogoje
              uporabe plezalnega centra Bolderaj.{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          {err && <p className="font-medium text-red-500">{err}</p>}
          <div className="self-end">
            <Button err={!err} />
          </div>
        </form>
      </div>
    </div>
  );
}

function Button({ err }: { err: boolean }) {
  return (
    <button
      className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:bg-gray cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
      disabled={!err}
    >
      <p className="flex items-center gap-10">
        Nadaljuj na Podatki za prijavo
        <span>
          <ChevronRightIcon className="h-4 stroke-3" />
        </span>
      </p>
    </button>
  );
}

export default SignupForm;
