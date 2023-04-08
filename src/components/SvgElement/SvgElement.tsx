import { SvgElementProps } from "../../types";

export const SvgElement: React.FC<SvgElementProps> = (props) => {
  return (
    <img
      src={props.src}
      width={props.width ? props.width : "auto"}
      height={props.height ? props.height : "auto"}
      alt="svg"
    />
  );
};
