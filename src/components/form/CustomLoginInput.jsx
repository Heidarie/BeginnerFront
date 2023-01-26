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
              className="block text-sm font-medium text-gray-200"
            >
              {label}
            </label>
            <Link
              to="/ForgotPassword"
              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
            >
              Zapomniałeś hasła?
            </Link>
          </div>
        ) : (
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "mt-1 p-2 block w-full rounded-md text-black bg-gray-50 border-red-500 shadow-sm focus:border-[#00df9a] focus:ring-[#00df9a] sm:text-sm"
              : "mt-1 p-2 block w-full rounded-md text-black bg-gray-50 shadow-sm focus:border-[#00df9a] focus:ring-[#00df9a] sm:text-sm"
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
