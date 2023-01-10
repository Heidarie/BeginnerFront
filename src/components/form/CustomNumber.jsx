import { useField } from "formik";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <>
      <div className="my-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200"
        >
          {label}
        </label>

        <ReactPhoneInput
          {...props}
          {...field}
          value={field.value}
          defaultCountry="pl"
          dropdownStyle={{
            borderColor: "white",
            backgroundColor: "white",
            color: "black",
          }}
          buttonStyle={{
            borderColor: "black",
            backgroundColor: "white",
            color: "white",
          }}
          inputStyle={{
            width: "100%",
            borderColor: "white",
            backgroundColor: "white",
            color: "black",
          }}
          regions={"europe"}
          onChange={(value) => {
            helpers.setValue(value);
          }}
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
export default CustomInput;
