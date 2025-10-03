"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return <div className="text-center text-4xl mt-10">{t("title")}</div>;
}
