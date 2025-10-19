import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem("i18nextLng", lang);
    } catch {
      // Ignore errors reading localStorage
    }
  }

  return (
    <select
      aria-label="Language switcher"
      className="border-gray self-start rounded-md border px-2 py-1"
      onChange={handleChange}
      value={i18n.language.slice(0, 2)}
    >
      <option value="en">EN</option>
      <option value="sl">SL</option>
      <option value="hr">HR</option>
    </select>
  );
}

export default LanguageSwitcher;
