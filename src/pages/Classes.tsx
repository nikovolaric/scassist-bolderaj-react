import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "../services/articlesAPI";
import Spinner from "../components/Spinner";
import ClassCard, {
  IClassArticle,
} from "../features/dashboard/classes/components/ClassCard";
import Header from "../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function Classes() {
  const { childId } = useParams();
  const queryClient = useQueryClient();
  const [ageGroup, setAgeGroup] = useState("adult");

  const childData = queryClient.getQueryData<{
    myChild: { ageGroup: string; age: number };
  }>(["child", childId]);
  const meData = queryClient.getQueryData<{ ageGroup: string; age: number }>([
    "me",
  ]);

  const me = childId ? childData?.myChild : meData;

  useEffect(
    function () {
      if (!me) return;
      if (me.age < 18) {
        setAgeGroup(me.ageGroup);
      } else {
        setAgeGroup("adult");
      }
    },
    [me],
  );

  const { data, isPending } = useQuery({
    queryKey: ["classArticles", ageGroup],
    queryFn: () => getArticles("T", ageGroup),
  });

  if (isPending) {
    return <Spinner />;
  }

  const single = data.articles.filter(
    (classInfo: IClassArticle) => !classInfo.noClasses,
  );
  const multiple = data.articles.filter(
    (classInfo: IClassArticle) => classInfo.noClasses,
  );

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="text-2xl font-semibold lg:text-3xl">
          Aktivnosti in vodene vadbe
        </h1>
        <div className="flex flex-col gap-10">
          {single && (
            <div className="flex flex-col gap-4">
              <p className="font-medium">Aktivnosti</p>
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 xl:grid-cols-3">
                {single.map((classInfo: IClassArticle) => (
                  <ClassCard classInfo={classInfo} key={classInfo._id} />
                ))}
              </div>
            </div>
          )}
          {multiple && (
            <div className="flex flex-col gap-4">
              <p className="font-medium">Vodene vadbe</p>
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 xl:grid-cols-3">
                {multiple.map((classInfo: IClassArticle) => (
                  <ClassCard classInfo={classInfo} key={classInfo._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Classes;
