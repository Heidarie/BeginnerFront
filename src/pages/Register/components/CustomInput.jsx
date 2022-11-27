import { useField } from "formik";
import { Link } from "react-router-dom";

const CustomInput = ({ label, forgotPassword, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mt-6">
        {forgotPassword ? (
          <div className="flex justify-between mb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              {label}
            </label>
            <Link
              to="/ForgotPassword"
              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        ) : (
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <input
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
export default CustomInput;
