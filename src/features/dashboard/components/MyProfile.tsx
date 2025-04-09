import MyKids from "./MyKids";
import LoginData from "./LoginData";
import OsebniPodatki from "./OsebniPodatki";
import { useQueryClient } from "@tanstack/react-query";

function MyProfile() {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<{ age: number }>(["me"]);

  if (!me) {
    return <p>Nekaj je šlo narobe</p>;
  }

  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:w-3/4 xl:w-2/3">
      <h2 className="text-2xl font-semibold lg:text-3xl">Moj profil</h2>
      <OsebniPodatki />
      <LoginData />
      {me.age > 18 && <MyKids />}
    </div>
  );
}

export default MyProfile;
