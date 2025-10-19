import { ChevronRightIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../../components/LinkBtn";
import { useTranslation } from "react-i18next";

function GiftsSection() {
  const { t } = useTranslation("common");

  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-2xl font-semibold">{t("dashboard.giftsTitle")}</h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-6 xl:grid-cols-3">
        <img
          src="/giftPhoto.jpg"
          alt="Slika plezalca"
          className="h-64 w-full rounded-xl object-cover lg:h-[300px] xl:col-span-2 xl:h-[364px]"
        />
        <div className="flex flex-col justify-between gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:h-[300px] lg:py-10 xl:h-[364px] xl:gap-12">
          <div className="flex flex-col gap-6 xl:gap-12">
            <p className="font-quicksand text-lg font-bold">
              {t("dashboard.giftsSubtitle")}
            </p>
            <p className="xl:text-xl">
              {t("dashboard.giftsText")}
            </p>
          </div>
          <div className="self-end">
            <LinkBtn to="/dashboard/gifts/pickage" type="primary">
              <p className="flex items-center gap-2">
                {t("dashboard.giftsBtn")} <ChevronRightIcon className="h-4 stroke-3" />
              </p>
            </LinkBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftsSection;
