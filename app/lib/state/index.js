import { useState } from "react";

// libs
import { capitalizeFirst } from "../strings";

export const generateForBoolean = ({ name, value }) => {
  const Name = capitalizeFirst(name);

  const [__value, __setValue] = useState(value || false);

  return {
    [name]: __value,

    [`set${Name}`]: () => __setValue((_) => true),

    [`reset${Name}`]: () => __setValue((_) => false),
    [`unset${Name}`]: () => __setValue((_) => false),

    [`toggle${Name}`]: () => __setValue((x) => !x),
  };
};

export const generateForBoolean_ = (name, value) =>
  generateForBoolean({ name, value });

// ===== EXAMPLE =====
//
// generateForBoolean("isModalOpen", true)
//    =>  { isModalOpen, setModalOpen, resetModalOpen, toggleModalOpen }
//
//
