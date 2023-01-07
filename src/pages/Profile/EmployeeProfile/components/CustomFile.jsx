import { useField } from "formik";

const CustomFile = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <button
        type="button"
        className="rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              : "mt-1 block w-full rounded-md bg-gray-50 border-red-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          }
        />
      </button>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};
export default CustomFile;
