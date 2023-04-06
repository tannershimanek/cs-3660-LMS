export const FeaturedImage = (props:any) => {
    return (
        <picture>
        <img
          className="hero"
          src={props.src}
          alt={props.alt}
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
}