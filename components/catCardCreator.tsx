/* eslint-disable @next/next/no-img-element */
import {useContext, useEffect, useState} from "react";
import {Context} from "./context";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import {IconButton} from "@mui/material";

const DB_API_URI = "http://localhost:3001";
const catAPI = process.env.NEXT_PUBLIC_THECATAPI_KEY ?? "";
const endpoint = `https://api.thecatapi.com/v1/images/search`;
const reqOptions = {
  method: "GET",
  headers: {
    "x-api-key": catAPI,
  },
};

const CatCardCreator = ({currentUser}: any) => {
  const [catIMG, setCatIMG] = useState<any>({});
  const [nickname, setNickname] = useState<string>("");
  const {userID} = useContext(Context);

  const fetchCat = async () => {
    const data = await fetch(endpoint)
      .then((res) => res.json())
      .then((data) => data[0]);
    setCatIMG(data);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const saveCatToHerd = async () => {
    if (nickname === "") {
      return alert("Please give the cat a name");
    }
    currentUser.herd.unshift({
      nickname,
      imageID: catIMG.id,
      imageURI: catIMG.url,
    });

    try {
      await fetch(`${DB_API_URI}/users/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then(() => window.location.reload());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem",
        padding: "1rem",
        border: "2px solid white",
        borderRadius: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Give the cat a name"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          value={nickname}
          maxLength={30}
          minLength={1}
          style={{
            width: "70%",
          }}
        />
        <EditIcon sx={{color: "white"}} />
      </div>
      <div
        style={{
          display: "grid",
          placeContent: "center",
          height: 400,
          width: 600,
        }}
      >
        <img
          style={{maxHeight: 400, maxWidth: 400}}
          src={catIMG.url}
          alt="Cat Image"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        <IconButton
          sx={{color: "white"}}
          onClick={async () => {
            const data = await fetch(endpoint, reqOptions)
              .then((res) => res.json())
              .then((data) => data[0]);

            setCatIMG(data);
          }}
        >
          <ReplayIcon />
        </IconButton>
        <IconButton sx={{color: "white"}} onClick={() => saveCatToHerd()}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default CatCardCreator;
