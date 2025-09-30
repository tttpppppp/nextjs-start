import SelectLanguage from "@/components/SelectLanguage";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <SelectLanguage />
      <h1>{t("title")}</h1>
    </div>
  );
}
