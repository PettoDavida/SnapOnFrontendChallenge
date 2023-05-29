import {useContext, useState, useEffect} from "react";
import {Context} from "./context";

const endpoint = "http://localhost:3001/users";

const DemoFooter = () => {
  const {userID, setUserID} = useContext(Context);

  const [users, setUsers] = useState<[{id: number; firstName: string}]>([
    {id: 42, firstName: "Linda"},
  ]);
  const fetchUsers = async () => {
    const data = await fetch(endpoint).then((res) => res.json());
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        width: "90%",
        height: "5rem",
        backgroundColor: "#c4c1c190",
        display: "flex",
        alignItems: "center",
        paddingLeft: "2rem",
        border: "2px solid black",
        borderRadius: 20,
      }}
    >
      <select
        name="userID"
        id="userID"
        style={{
          height: "3rem",
          width: "5rem",
          background: "white",
          color: "black",
          padding: ".5rem",
        }}
        defaultValue={userID}
        onChange={(event) => {
          let value = event.target.value as unknown as number;
          setUserID(value);
        }}
      >
        {users.map((item, i) => {
          return (
            <option key={i} value={item.id}>
              {item.firstName}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default DemoFooter;
