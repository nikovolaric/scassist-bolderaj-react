import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { createSession } from "../../../../services/paymentAPI";
import { useAppSelector } from "../../../../app/hooks";
import { getClassCart } from "../../classes/slices/classCartSlice";

function ClassPaymentForm() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const classCart = useAppSelector(getClassCart);
  const queryClient = useQueryClient();
  const articleData = queryClient.getQueryData<{
    article: { classPriceData: { priceDDV: number } };
  }>(["article"]);
  const { data, isPending } = useQuery({
    queryKey: ["checkoutData", articleData?.article.classPriceData.priceDDV],
    queryFn: () =>
      createSession(
        articleData?.article.classPriceData.priceDDV
          .toFixed(2)
          .replace(",", ".") as string,
      ),
    enabled: !!articleData,
  });

  useEffect(() => {
    if (!isPending && data?.data?.id) {
      const widgetScript = document.createElement("script");
      widgetScript.src = `${import.meta.env.VITE_HOBEX_URL}/v1/paymentWidgets.js?checkoutId=${data.data.id}`;
      widgetScript.crossOrigin = "anonymous";
      widgetScript.integrity = data.data.integrity;

      if (id) {
        localStorage.setItem("classCart", JSON.stringify(classCart));
      }

      document.body.appendChild(widgetScript);

      return () => {
        document.body.removeChild(widgetScript);
      };
    }
  }, [data, isPending, id, classCart]);

  return (
    <form
      action={`${import.meta.env.VITE_FRONTEND_URL}/${pathname}/success`}
      className="paymentWidgets"
      data-brands="VISA MASTER"
    ></form>
  );
}

export default ClassPaymentForm;
