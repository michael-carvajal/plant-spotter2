import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

const Home = () => {
  const history = useHistory();
  const [cookies, removeCookie] = useCookies([]);
  // const [username, setUsername] = useState("");
  const { session  } = useSelector(state => state)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       history.push("/login");
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:4000",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, user } = data;
  //     setUsername(user);
  //     return status
  //       ? toast(`Hello ${user}`, {
  //           position: "top-right",
  //         })
  //       : (removeCookie("token"), history.push("/login"));
  //   };
  //   verifyCookie();
  // }, [cookies, history, removeCookie]);
  const Logout = async () => {
    removeCookie("token");

    dispatch(logout())
    history.push("/login");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{session.user.username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
