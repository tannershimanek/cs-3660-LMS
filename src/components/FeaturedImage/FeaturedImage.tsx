import { FeaturedImageProps } from "../../types";

export const FeaturedImage: React.FC<FeaturedImageProps> = ({ src, alt}) => {
  return ( 
    <picture>
      <img
        className="hero"
        src={src}
        alt={alt}
        width="100%"
        //   height="600px"
        style={{
          objectFit: "cover",
          zIndex: "-1",
          maxWidth: "1320px",
          maxHeight: "600px",
        }}
      />
    </picture>
  );
};
