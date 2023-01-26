import { useField } from "formik";

const CustomTextArea = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "mt-1 p-4 block w-full rounded-md bg-gray-50 border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              : "mt-1 p-4 block w-full rounded-md bg-gray-50 border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          }
        />
        {meta.touched && meta.error && (
          <div className="error">{meta.error}</div>
        )}
      </div>
    </>
  );
};
export default CustomTextArea;
