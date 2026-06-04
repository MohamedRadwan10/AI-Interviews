"use client";
import React, { useMemo } from "react";
import MainText from "@/Components/Common/MainText";
import MainInput from "@/Components/Common/Inputs";
import { getAllCountries, getStatesOfCountry } from "@/Utils/Func/LocationData";
import { companyLocationConfig } from "@/Config/settingConfig";

const LocationSection = ({ values, errors, touched, setFieldValue, handleBlur }) => {
  const countryOptions = useMemo(() => getAllCountries(), []);
  const stateOptions = values.Country ? getStatesOfCountry(values.Country) : [];

  return (
    <div className="bg-light-white dark:bg-dark-primary-4 rounded-3xl p-8 border border-ui-borderLight dark:border-ui-border shadow-sm flex flex-col gap-6 w-full font-sans">
      <div>
        <MainText tag="h2" title="Location" className="text-xl font-bold text-ui-textMain dark:text-white" />
        <div className="h-[1px] bg-ui-borderLight dark:bg-dark-gray/30 w-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <MainInput
          field_name="Country"
          type="select"
          label="Country"
          placeholder="Select Country"
          value={values.Country}
          error={touched.Country && errors.Country}
          onChange={(e) => {
            const countryVal = e.target.value || e;
            setFieldValue("Country", countryVal);
            setFieldValue("Government", "");
          }}
          onBlur={handleBlur}
          options={countryOptions}
          validation={companyLocationConfig.fields[0].validation}
        />
        
        <MainInput
          field_name="Government"
          type="select"
          label="Governorate"
          placeholder="Select Governorate"
          value={values.Government}
          error={touched.Government && errors.Government}
          onChange={(e) => setFieldValue("Government", e.target.value || e)}
          onBlur={handleBlur}
          options={stateOptions}
          disabled={!values.Country}
          validation={companyLocationConfig.fields[1].validation}
        />
      </div>

      <MainInput
        field_name="City"
        type="text"
        label="Detailed Address"
        placeholder="e.g. Building 4, Street 9, Maadi"
        value={values.City}
        error={touched.City && errors.City}
        onChange={(e) => setFieldValue("City", e.target.value)}
        onBlur={handleBlur}
        validation={companyLocationConfig.fields[2].validation}
      />
    </div>
  );
};

export default LocationSection;
