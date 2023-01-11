import { useField } from "formik";

const CustomSelect = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={className}>
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
        <select
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "mt-1 block w-full rounded-md text-black bg-gray-50 border-red-500 shadow-sm focus:border-[#00df9a] focus:ring-[#00df9a] sm:text-sm"
              : "mt-1 block w-full rounded-md text-black bg-gray-50 shadow-sm focus:border-[#00df9a] focus:ring-[#00df9a] sm:text-sm"
          }
        />
        {meta.touched && meta.error && (
          <div className="error">{meta.error}</div>
        )}
      </div>
    </>
  );
};
export default CustomSelect;
