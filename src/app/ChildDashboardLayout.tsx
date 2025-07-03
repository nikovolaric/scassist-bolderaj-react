import { Suspense } from "react";
import Spinner from "../components/Spinner";
import { Outlet, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMyChild } from "../services/userAPI";

function ChildDashboardLayout() {
  const { childId } = useParams();

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
