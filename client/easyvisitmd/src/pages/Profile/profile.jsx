import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Profile() {
  const { loadUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    loadUserInfo().then((res) => {
      console.log(res);
    });
  }, []);

  return <h4>hi</h4>;
}
