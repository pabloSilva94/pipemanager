import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { getLocal } from "../../controller/groups/localStorage/get";

function NotFound() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleLogin = () => {
    return navigate("/login", { replace: true });
  };
  const handleHome =()=>{
    return navigate("/home", { replace: true });
  }
  useEffect(() => {
    const prov = getLocal();
    if (prov.success === false) {
      return navigate("/login", { replace: true });
    }
  }, [])
  return (
    <div className="containerNot">
      <div className="formLogin">
        <h1>Ops! </h1>
        {name === null ? <Button type="primary" className="inpt" onClick={handleLogin}>
          Login
        </Button> : <Button type="primary" className="inpt" onClick={handleHome}>
          Voltar
        </Button>}
      </div>
    </div>
  );
}

export default NotFound;
