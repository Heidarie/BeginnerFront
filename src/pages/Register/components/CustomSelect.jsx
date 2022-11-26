import { useField } from "formik";

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mt-6">
        <label>{label}</label>
        <select
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-800 dark:focus:border-red-800 focus:outline-none focus:ring focus:ring-opacity-70"
              : "block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-800 dark:focus:border-green-800 focus:outline-none focus:ring focus:ring-opacity-70"
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
