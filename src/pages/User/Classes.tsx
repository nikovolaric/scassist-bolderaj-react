import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/articlesAPI";
import Spinner from "../../components/Spinner";
import ClassCard, {
  IClassArticle,
} from "../../features/dashboard/classes/components/ClassCard";
import Header from "../../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMe, getMyChild } from "../../services/userAPI";

function Classes() {
  const { childId } = useParams();
  const [ageGroup, setAgeGroup] = useState("adult");

  const { data: childData, isLoading: isLoadingChild } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  });
  const {
    data: meData,
    isLoading: isLoadingMe,
    isPending,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

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

  const { data, isLoading } = useQuery({
    queryKey: ["classArticles", ageGroup],
    queryFn: () => getArticles(["A", "VV"], ageGroup),
    enabled: !isPending,
  });

  if (isLoading || isLoadingMe || isLoadingChild) {
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
        <div>
          <h1 className="font-semibold">Aktivnosti in vodene vadbe</h1>
          {meData.parentOf.length > 0 && (
            <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
              Nakupujem za:{" "}
              {!childId
                ? `${meData.firstName} (jaz)`
                : `${childData.myChild.firstName} (${childData.myChild.age} let)`}
            </p>
          )}
        </div>
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
