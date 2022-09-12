export const strequal = (a, b) => {
  return (
    !!a &&
    !!b &&
    typeof a === "string" &&
    typeof b === "string" &&
    a?.indexOf(b) !== -1 &&
    a?.length === b?.length
  );
};
