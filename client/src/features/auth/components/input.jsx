import RenderFormikError from "../../../shared/components/renderFormikError";

export default function Input({
  name,
  type,
  placeholder,
  formik,
  disabled,
  readOnly,
}) {
  console.log(formik);

  return (
    <div>
      <input
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        className={` ${
          formik.touched[name] &&
          formik.errors[name] &&
          "!border-red-500 !border-[1px]"
        } bg-[#2e2e2e] text-white p-3 disabled:opacity-50 disabled:cursor-not-allowed border-[1px] border-transparent rounded w-full outline-none`}
        {...formik.getFieldProps(name)}
      />
      <RenderFormikError field={name} formik={formik} />
    </div>
  );
}
