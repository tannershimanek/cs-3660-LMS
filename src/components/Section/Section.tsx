import { SectionProps } from "../../types";

export const Section: React.FC<SectionProps> = ({
  title,
  content,
  counter,
  bg,
  showAside,
}) => {
  const backgroundColor = bg === "gray" ? "bg-light" : "bg-white";
  const contentJustify = showAside
    ? "justify-content-between"
    : "justify-content-center";

  return (
    <section
      className={`row p-4 ${backgroundColor}`}
      style={{ maxWidth: "1320px", margin: "auto" }}
    >
      <div className={`d-flex ${contentJustify} align-items-center my-4`}>
        {showAside ? (
          <div className={"text-decoration-underline text-danger"}>
            <h2 className={"text-primary opacity-8"}>{counter}</h2>
          </div>
        ) : null}
        <div className={"text-center"} style={{ maxWidth: "70rem" }}>
          {title}
          {content}
        </div>
      </div>
    </section>
  );
};
