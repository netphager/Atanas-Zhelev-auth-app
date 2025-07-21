"use client";
import { useTranslation } from "next-i18next";
import Select from "./Select";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    i18n.changeLanguage(newLocale);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath);
  };

  return (
    <Select
      label={t("language")}
      name="language"
      value={i18n.language}
      onChange={handleChange}
      options={[
        { value: "en", label: "English" },
        { value: "bg", label: "Български" },
      ]}
    />
  );
};

export default LanguageSwitcher;
