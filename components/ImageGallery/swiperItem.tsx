export const SwiperItem = ({
    id,
    imgSrc,
  }: {
    id: number;
    imgSrc: string;
  }): JSX.Element => (
    <div
      style={{
        height: "15rem",
        width: "20rem",
        overflow: "hidden",
      }}
    >
      <img draggable="false" src={imgSrc} width="100%" alt="movie image" />
    </div>
  );