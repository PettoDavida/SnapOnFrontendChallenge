/* eslint-disable @next/next/no-img-element */
import {CatCardProps} from "@/types/global";

const CatCard: React.FC<CatCardProps> = ({
  nickname,
  imageURI,
  breed,
  breedId,
}) => {
  return (
    <div
      style={{
        border: "2px solid white",
        borderRadius: 20,
        padding: "2rem",
        marginBottom: "1rem",
      }}
    >
      <h2>{nickname}</h2>
      <div
        style={{
          display: "grid",
          placeContent: "center",
          height: 300,
          width: 300,
        }}
      >
        <img
          style={{maxHeight: 300, maxWidth: 300}}
          src={imageURI}
          alt={`Picture of ${nickname}`}
        />
      </div>
      {/* 
      Monica said to comment these out for now. Maybe we'll use them later.
      <p>Breed: {breed}</p>
      <p>Breed ID: {breedId}</p> */}
    </div>
  );
};

const CatCardPanel = (props: {herd?: CatCardProps[]; name?: string}) => {
  return (
    <>
      <h1 style={{textAlign: "center"}}>{props.name} Herd</h1>
      {props.herd ? (
        props.herd.map((cat, i) => <CatCard key={i} {...cat} />)
      ) : (
        <></>
      )}
    </>
  );
};
export default CatCardPanel;
