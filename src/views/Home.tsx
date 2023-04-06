import { Section } from "../components/Section/Section";
import {
  sectionOneTitle,
  sectionOneContent,
  sectionTwoTitle,
  sectionTwoContent,
  sectionThreeTitle,
  sectionThreeContent,
} from "../services/pageData";

export const Home = () => {
  document.title = "World MTB League";
  return (
    <>
      <picture>
        <source srcSet="../images/rb.avif" media="(min-width: 991px)" />
        <source srcSet="../images/rb-m-2.avif" media="(min-width: 478px)" />
        <img
          className="hero"
          src="../images/rb-xs.avif"
          alt="bike-race"
          width="100%"
          height="70%"
          style={{
            objectFit: "cover",
            zIndex: "-1",
            maxWidth: "1320px",
            maxHeight: "65%",
          }}
        />
      </picture>
      <Section
        title={sectionOneTitle}
        content={sectionOneContent}
        counter={"00"}
        bg={"white"}
        showAside={true}
      />
      <Section
        title={sectionTwoTitle}
        content={sectionTwoContent}
        counter={"01"}
        bg={"gray"}
        showAside={true}
      />
      <Section
        title={sectionThreeTitle}
        content={sectionThreeContent}
        counter={"02"}
        bg={"white"}
        showAside={true}
      />
    </>

    // </div>
  );
};
