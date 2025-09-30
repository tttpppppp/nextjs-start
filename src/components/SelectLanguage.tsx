"use client";
import { Locale, locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

const SelectLanguage = () => {
  const t = useTranslations("switchLanguage");
  const locale = useLocale();
  const [language, setlanguage] = React.useState(locale);

  const handleChange = async (event: SelectChangeEvent) => {
    const newLocale = event.target.value as Locale;
    setlanguage(newLocale);
    await setUserLocale(newLocale);
  };

  return (
    <div className="mt-10">
      <Box sx={{ maxWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t("title")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={handleChange}
          >
            {locales.map((locales, index) => {
              return (
                <MenuItem key={index} value={locales}>
                  {t(locales)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectLanguage;
