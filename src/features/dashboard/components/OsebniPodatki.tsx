import { useQueryClient } from "@tanstack/react-query";

interface IUser {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string | undefined;
  email: string;
}

function OsebniPodatki() {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<IUser>(["me"]);

  if (!me) {
    return <p>Nekaj je šlo narobe!</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">Osebni podatki</p>
      <form className="flex flex-col gap-6 rounded-xl bg-white px-5 py-4 lg:px-20 lg:py-16">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Ime</label>
            <input
              type="text"
              value={me.firstName}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Priimek</label>
            <input
              type="text"
              value={me.lastName}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Datum rojstva</label>
            <input
              type="text"
              value={new Date(me.birthDate).toLocaleDateString("sl-SI", {
                day: "2-digit",
                year: "numeric",
                month: "2-digit",
              })}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
            <div className="hidden lg:block" />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Naslov bivališča</label>
            <input
              type="text"
              value={me.address}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Kraj bivališča</label>
            <input
              type="text"
              value={me.city}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Poštna številka</label>
            <input
              type="text"
              value={me.postalCode}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Država</label>
            <input
              type="text"
              value={me.country}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Telefonska številka</label>
            <input
              type="text"
              value={me.phoneNumber}
              disabled={me.phoneNumber !== undefined}
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Elektronski naslov</label>
            <input
              type="text"
              value={me.email}
              disabled
              className="drop-shadow-input border-gray rounded-lg border bg-white px-3.5 py-2.5 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default OsebniPodatki;
