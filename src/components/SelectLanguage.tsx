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
    <div className="">
      <Box sx={{ maxWidth: 250 }}>
        <FormControl size="medium" sx={{ minWidth: 60 }}>
          <Select
            value={language}
            onChange={handleChange}
            displayEmpty
            sx={{
              "& .MuiSelect-select": { py: 1, px: 2, fontSize: "1rem" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
            }}
          >
            {locales.map((locales, index) => {
              return (
                <MenuItem key={index} value={locales}>
                  {locales}
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
