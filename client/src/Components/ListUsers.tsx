import "./listusers.scss";
import { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton } from "@material-ui/core";

const ListUsers = ({ setModal }: any) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/get-users`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.res.Users);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  return (
    <div className="list-user-bg">
      {loading ? (
        <CircularProgress
          color="inherit"
          style={{
            color: "white",
          }}
        />
      ) : (
        <div className="lu-container">
          <div className="modal-header">
            <div></div>
            <IconButton onClick={() => setModal(false)}>
              <CloseIcon color="inherit" />
            </IconButton>
          </div>
          <div className="tab-a">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: any) => {
                  return (
                    <tr>
                      <td>{user.Username}</td>
                      <td>{user.Attributes[0].Value}</td>
                      <td>{user.UserCreateDate.slice(0, 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
