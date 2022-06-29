import { forwardRef } from "react";

export type RowProps = {} & React.HTMLAttributes<HTMLDivElement>;

function _Row(props: RowProps, ref: React.LegacyRef<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      {...props}
      className={`flex flex-row ${props.className || ""}`}
    />
  );
}

const Row = forwardRef(_Row);
export default Row;
