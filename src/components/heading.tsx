import React from "react";

type HeadingProps = {
  value?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({ children, value = 2 }: HeadingProps) => {
  return React.createElement(
    `h${value}`,
    { className: sizeClassMap[value] },
    children
  );
};

export default Heading;

const sizeClassMap = {
  1: "text-xl font-bold",
  2: "text-lg font-bold",
  3: "text-lg",
  4: "text-md font-bold",
  5: "text-md",
  6: "text-sm font-bold",
};
