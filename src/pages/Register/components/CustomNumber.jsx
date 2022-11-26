import { useField } from "formik";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <>
      <div className="mt-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          {label}
        </label>

        <ReactPhoneInput
          {...props}
          {...field}
          value={field.value}
          defaultCountry="pl"
          dropdownStyle={{
            borderColor: "rgb(55 65 81 / 700)",
            backgroundColor: "rgb(17 24 39 / 900)",
            color: "white",
          }}
          buttonStyle={{
            borderColor: "rgb(55 65 81 / 700)",
            backgroundColor: "rgb(17 24 39 / 900)",
            color: "black",
          }}
          inputStyle={{
            width: "100%",
            borderColor: "rgb(55 65 81 / 700)",
            backgroundColor: "rgb(17 24 39 / 900)",
            color: "white",
          }}
          regions={"europe"}
          onChange={(value) => {
            helpers.setValue(value);
          }}
          className={
            meta.touched && meta.error
              ? "block w-full text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-black dark:border-gray-700 focus:border-red-800 dark:focus:border-red-800 focus:outline-none focus:ring focus:ring-opacity-70"
              : "block w-full text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-black dark:border-gray-700 focus:border-green-800 dark:focus:border-green-800 focus:outline-none focus:ring focus:ring-opacity-70"
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
