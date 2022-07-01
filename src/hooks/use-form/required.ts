export type requiredProps = string | number | undefined;

function required(value: requiredProps) {
  return (
    ((!value && value !== 0) || !String(value).trim()) &&
    "This field is required."
  );
}

export default required;
