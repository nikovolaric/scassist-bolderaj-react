import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getSignUpData,
  setAddress,
  setAgreesToTerms,
  setBirthDate,
  setCity,
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
      <h1 className="text-2xl font-semibold lg:text-3xl">Registrirajte se</h1>
      <div className="flex flex-col gap-8">
        <p className="font-medium">
          V kolikor želite registrirati mladoletno osebo, se najprej
          registrirajte kot starš oz. skrbnik, nato pa postopek registracije
          otroka pričnete v Moj profil.
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
                placeholder="Vnesite svoje ime"
                value={userData.firstName}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
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
                placeholder="Vnesite svoj priimek"
                value={userData.lastName}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
            {/* {age >= 15 && age < 18 && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Kontaktni mail starša ali skrbnika
                </label>
                <input
                  type="text"
                  placeholder="Vnesite kontaktni mail starša ali skrbnika"
                  className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                  autoComplete="off"
                  onChange={(e) =>
                    dispatch(setParentContactMail(e.target.value))
                  }
                />
              </div>
            )} */}
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Naslov bivališča <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vnesite naslov bivališča"
                value={userData.address}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required
                onChange={(e) => dispatch(setAddress(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Kraj bivališča <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vnesite kraj bivališča"
                value={userData.city}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required
                onChange={(e) => dispatch(setCity(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Poštna številka <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vnesite poštno številko"
                value={userData.postalCode}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required
                onChange={(e) => dispatch(setPostalCode(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Država <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vnesite državo bivališča"
                value={userData.country}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                required
                onChange={(e) => dispatch(setCountry(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Telefonska številka</label>
              <input
                type="text"
                placeholder="Vnesite telefonsko številko"
                value={userData.phoneNumber}
                className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 outline-none"
                autoComplete="off"
                onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
              />
            </div>
            <div />
          </div>
          <p>
            Vaši osebni podatki bodo hranjeni v skladu z Uredbo o varovanju
            osebnih podatkov. Služili bodo za upravljanje spletne aplikacije
            Bolderaj, za vodenje statističnih evidenc obiska in ostalih namenov,
            opisanih v Splošnem pravilniku o varovanju osebnih podatkov.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreesToterms"
              checked={userData.agreesToTerms}
              required
              onChange={(e) =>
                dispatch(
                  setAgreesToTerms(e.target.value === "on" ? true : false),
                )
              }
            />
            <label className="font-medium">
              Prebral sem in se strinjam s pogoji poslovanja.
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
