import { useEffect, useState } from "react";
import { locations } from "@/lib/api/utils/locations.data";
import { formatText, normalizeText } from "@/lib/api/utils/utils";
import SearchSelect from "../searchSelect";

export default function DepartaCiudad({
  formData,
  handleChange,
  isLocked = false,
  errors = {},
  required,
}) {
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (formData?.department) {
      const dep = locations.find(
        (d) =>
          normalizeText(d.department) === normalizeText(formData.department),
      );

      setAvailableCities(dep ? dep.city : []);
    } else {
      setAvailableCities([]);
    }
  }, [formData?.department]);

  useEffect(() => {
    if (formData.city) {
      handleChange({
        target: { name: "city", value: "" },
      });
    }
  }, [formData.department]);

  const departmentOptions = locations.map((d) => ({
    label: formatText(d.department),
    value: normalizeText(d.department),
  }));

  const cityOptions = availableCities.map((c) => ({
    label: formatText(c),
    value: normalizeText(c),
  }));

  return (
    <>
      <SearchSelect
        label="Departamento"
        name="department"
        value={normalizeText(formData.department || "")}
        options={departmentOptions}
        placeholder="Buscar departamento"
        onChange={handleChange}
        disabled={isLocked}
        error={errors?.department}
        required={required}
      />

      <SearchSelect
        label="Ciudad"
        name="city"
        value={normalizeText(formData.city || "")}
        options={cityOptions}
        placeholder={
          formData.department
            ? "Buscar ciudad"
            : "Seleccione un departamento primero"
        }
        onChange={handleChange}
        disabled={!formData.department || isLocked}
        error={errors?.city}
        required={required}
      />
    </>
  );
}
