import MyKids from "./MyKids";
import LoginData from "./LoginData";
import OsebniPodatki from "./OsebniPodatki";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../services/userAPI";

function MyProfile() {
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isPending) {
    return <p>...</p>;
  }

  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:w-3/4 xl:w-2/3">
      <h2 className="text-2xl font-semibold lg:text-3xl">Moj profil</h2>
      <OsebniPodatki />
      <LoginData />
      {data.age > 18 && <MyKids />}
    </div>
  );
}

export default MyProfile;
