import React, { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import EyeIcon from "../MellowIcons/EyeIcon";
import LockIcon from "../MellowIcons/LockIcon";
import PortraitIcon from "../MellowIcons/PortraitIcon";
import EnvelopeIcon from "../MellowIcons/EnvelopeIcon";

const InputField = ({ className, name, label, placeholder, type, state = "default", disabled, id, errorMsg, ...props}) => {
  const ref = useRef(null);

  return ( 
    <>
      <label className="inline-flex flex-col w-full space-y-1" htmlFor={name}>
        {label && (
          <p className="inline-flex text-zinc-800 text-sm font-normal leading-normal">{ label }</p>
        )}

        <div className={clsx(
          "flex items-center px-4 space-x-3 h-11 relative rounded-md border group",
          state === "default" && "border-zinc-300",
          state === "valid" && "border-brand",
          state === "invalid" && "border-red-500",
        )}>
          { type === "name" && <PortraitIcon /> }
          { type === "email" && <EnvelopeIcon /> }
          { type === "password" && <LockIcon /> }

          <input 
            className={clsx(
              "w-full focus-visible:outline-none placeholder:tracking-normal",
              type === "password" && "tracking-[0.5em]",
            )}
            type={type === "name" ? "text" : type}
            name={name}
            ref={ref}
            id={id || name || ""}
            placeholder={placeholder}
            disabled={disabled}
            {...props}
          />

          { type === "password" && (
            <EyeIcon 
              className="cursor-pointer"
              onClick={() => {
                ref.current.type = ref.current.type === "password" ? "text" : "password";
                ref.current.classList.toggle("tracking-[0.5em]");
              }}
            />
          ) }
        </div>

        {state === "invalid" && errorMsg ? (
          <p className="inline-flex text-red-500 text-sm font-normal leading-normal">{ errorMsg }</p>
        ) : ""}
      </label>
    </>
  );
}
 
export default InputField;

InputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["name", "email", "password"]),
  state: PropTypes.oneOf(["default", "valid", "invalid"]),
}