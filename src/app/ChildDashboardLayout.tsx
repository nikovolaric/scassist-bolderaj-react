import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Outlet, useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyChild } from "../services/userAPI";

function ChildDashboardLayout() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const me: { parentOf: { child: string }[] } | undefined =
    queryClient.getQueryData(["me"]);

  useEffect(function () {
    if (!me || me.parentOf.length === 0) {
      navigate("/dashboard");
    }
  });

  const { isPending } = useQuery({
    queryKey: ["child"],
    queryFn: () => getMyChild(childId!),
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

export default ChildDashboardLayout;
