import { forwardRef } from "react";

export type ColumnProps = {} & React.HTMLAttributes<HTMLDivElement>;

function _Column(props: ColumnProps, ref: React.LegacyRef<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      {...props}
      className={`flex flex-col ${props.className || ""}`}
    />
  );
}

const Column = forwardRef(_Column);
export default Column;
