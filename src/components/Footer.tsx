import {
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

function Footer() {
  return (
    <footer className="absolute left-0 mt-28 flex w-dvw flex-col gap-16 rounded-t-xl bg-white pb-10">
      <div className="flex w-full max-w-[1440px] flex-col gap-16 pt-8 pb-15 font-medium lg:pt-10 xl:mx-auto">
        <img
          src="/logocrn.svg"
          alt="Black logo"
          className="h-6 self-start px-4 md:px-8 lg:px-20"
        />
        <div className="flex flex-col gap-16 px-4 md:px-8 lg:grid lg:grid-cols-3 lg:px-20">
          <div className="flex flex-col gap-8 lg:gap-14">
            <p className="font-quicksand text-lg font-bold lg:text-xl">
              KONTAKT
            </p>
            <div className="flex flex-col gap-4">
              <p>PE: Plezalni center</p>
              <p>Popovičeva ulica 2</p>
              <p>3000 Celje, Slovenija</p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-4">
                <ChatBubbleLeftIcon className="text-secondary w-6 flex-none stroke-2" />
                info@bolderaj.si
              </p>
              <a className="flex items-center gap-4" href="tel:+38641718828">
                <PhoneIcon className="text-secondary w-6 flex-none stroke-2" />
                041 718 828
              </a>
            </div>
          </div>
          <div className="flex w-60 flex-col gap-8 lg:gap-14">
            <p className="font-quicksand text-lg font-bold lg:text-xl">
              DELOVNI ČAS
            </p>
            <div className="flex flex-col gap-4">
              <p className="flex items-center justify-between">
                odprto vsak dan<span>9:00-22:00</span>
              </p>
              {/* <p className="flex items-center justify-between">
                Nedelje in prazniki<span>9:00-21:00</span>
              </p> */}
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:gap-14">
            <p className="font-quicksand text-lg font-bold lg:text-xl">
              UPORABA SPLETNE APLIKACIJE
            </p>
            <p className="flex items-center gap-4">
              <ChatBubbleLeftRightIcon className="text-secondary w-6 flex-none stroke-2" />
              podpora@bolderaj.si
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary/45 flex w-full items-center justify-between px-4 py-3 text-xs font-semibold md:px-8 lg:justify-center lg:gap-16 lg:px-20 lg:text-base">
        <a
          href="https://bolderaj.si/splosni-pogoji-poslovanja/"
          target="_blank"
          className="underline"
        >
          Splošni pogoji poslovanja
        </a>
        <a
          href="https://bolderaj.si/pravila-in-pogoji-uporabe-plezalnega-centra-bolderaj/"
          target="_blank"
          className="underline"
        >
          Pravila in pogoji uporabe plezalnega centra
        </a>
        {/* <a href="/" target="_blank" className="underline">
          Nastavitve piškotkov
        </a> */}
      </div>
      {/* <p className="w-full max-w-[1440px] px-4 text-center md:px-8 md:text-right lg:px-20 xl:mx-auto">
        Oblikovanje in razvoj:{" "}
        <a href="https://www.lamastrategies.com" target="_blank">
          LAMA Strategies
        </a>
      </p> */}
    </footer>
  );
}

export default Footer;
