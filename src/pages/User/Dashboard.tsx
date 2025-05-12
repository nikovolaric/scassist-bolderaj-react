import { useQueryClient } from "@tanstack/react-query";
import Logo from "../../components/Logo";
import MyChildrenSection from "../../features/dashboard/components/MyChildrenSection";
import MyClimbingSection from "../../features/dashboard/components/MyClimbingSection";
// import UserBox from "../../features/dashboard/components/UserBox";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";
import NavMenu from "../../components/NavMenu";
import { sendNewConfirmMail } from "../../services/authAPI";
import { useState } from "react";
import GiftsSection from "../../features/dashboard/components/GiftsSection";
import Spinner from "../../components/Spinner";

function Dashboard() {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData(["me"]) as
    | { parentOf: { child: string }[]; confirmMailTokenExpires: string }
    | undefined;

  if (!me) return <Spinner />;

  return (
    <>
      <UnactiveAccount confirmMailTokenExpires={me.confirmMailTokenExpires} />
      <div className="my-16 flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <div className="w-1/2 md:w-1/3 lg:w-1/6">
            <Logo />
          </div>
          <NavMenu />
        </div>
        <div className="flex flex-col gap-12 lg:mt-12 lg:gap-24">
          <WelcomeSection />
          <MyClimbingSection />
          {Array.isArray(me.parentOf) && me.parentOf.length > 0 && (
            <MyChildrenSection />
          )}
          <GiftsSection />
        </div>
      </div>
    </>
  );
}

function UnactiveAccount({
  confirmMailTokenExpires,
}: {
  confirmMailTokenExpires: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  async function handleClick() {
    try {
      setIsLoading(true);

      const data = await sendNewConfirmMail();

      if (data instanceof Error) {
        throw data;
      }

      setErr("");
      setSuccess(
        "Na elektronski naslov smo poslali novo potrditveno kodo, ki velja 24h.",
      );
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {new Date() > new Date(confirmMailTokenExpires) && (
        <div className="fixed top-0 left-0 z-[999] h-dvh w-dvw bg-black/50">
          <div className="border-primary drop-shadow-input mx-4 mt-40 flex flex-col items-center gap-10 rounded-lg border bg-white px-4 py-6 text-center md:mx-8 lg:mx-20 lg:px-8 2xl:mx-auto 2xl:w-1/2">
            <p className="font-semibold lg:text-lg">
              Tvoj elektronski naslov ni bil pravočasno potrjen. S klikom na
              spodnji gumb bomo na elektronski naslov poslali novo povezavo.
            </p>
            <div>
              {success ? (
                <p className="text-secondary font-semibold lg:text-lg">
                  {success}
                </p>
              ) : (
                <button
                  className="from-primary to-secondary drop-shadow-btn hover:to-primary w-fit cursor-pointer rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-colors duration-300 disabled:cursor-not-allowed"
                  onClick={handleClick}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "Pošlji potrditveno kodo"}
                </button>
              )}
              {err && <p className="font-medium text-red-500">{err}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
