import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../locales/en/common.json";
import enAuth from "../locales/en/auth.json";
import slCommon from "../locales/sl/common.json";
import slAuth from "../locales/sl/auth.json";
import slTickets from "../locales/sl/tickets.json";
import enTickets from "../locales/en/tickets.json";
import slPayments from "../locales/sl/payment.json";
import enPayments from "../locales/en/paymet.json";

const isDev = import.meta.env.DEV;

// const supportedLanguages = ["en", "sl"] as const;
// type SupportedLang = (typeof supportedLanguages)[number];

// function detectInitialLanguage(): SupportedLang {
//   try {
//     const stored =
//       typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : null;
//     if (stored && supportedLanguages.includes(stored as SupportedLang))
//       return stored as SupportedLang;
//   } catch {
//     // Ignore errors reading localStorage
//   }

//   const browser =
//     typeof navigator !== "undefined"
//       ? navigator.language?.slice(0, 2).toLowerCase()
//       : undefined;
//   if (browser && supportedLanguages.includes(browser as SupportedLang))
//     return browser as SupportedLang;
//   return "sl";
// }

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      tickets: enTickets,
      payments: enPayments,
    },
    sl: {
      common: slCommon,
      auth: slAuth,
      tickets: slTickets,
      payments: slPayments,
    },
  },
  ns: ["common", "auth"],
  defaultNS: "common",
  debug: isDev,
  lng: "sl",
  fallbackLng: "sl",
});
