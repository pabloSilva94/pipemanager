import { Button, Input, notification } from "antd";
import React, { useState } from "react";
import "./Login.css";
import { loginProvider, register } from "../../controller/loginPovider";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
function Login() {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState({ email: "", password: "" });
  const [isErrorRegister, setIsErrorRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = userData;
    setIsLoader(true);
    if (email === "" || password === "") {
      email === ""
        ? setIsError({ ...isError, email: "error" })
        : setIsError({ ...isError, email: "" });
      password === ""
        ? setIsError({ ...isError, password: "error" })
        : setIsError({ ...isError, password: "" });

      const message = "Aviso";
      const description = "Preencha o campo";
      const placement = "topLeft";
      return openNotification("warning", message, description, placement);
    }
    const userBody = {
      email: email.trim(),
      password: password.trim(),
    };
    const res = await loginProvider(userBody);
    console.log(res);
    if (res.success === false) {
      setIsLoader(false);
      const message = "Info";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("info", message, description, placement);
    }
    setTimeout(() => {
      setIsLoader(false);
      setUserData({ ...userData, email: "", password: "" });
      const message = "Sucesso";
      const description = "Seja bem vindo!";
      const placement = "topLeft";
      openNotification("success", message, description, placement);
      return navigate("/groups", { replace: true });
    }, 1500);
  };
  const handleRegister = async () => {
    const { email, password, name } = userRegister;
    if (email === "" || password === "" || name === "") {
      email === ""
        ? setIsErrorRegister({ ...isErrorRegister, email: "error" })
        : setIsErrorRegister({ ...isErrorRegister, email: "" });
      password === ""
        ? setIsErrorRegister({ ...isErrorRegister, password: "error" })
        : setIsErrorRegister({ ...isErrorRegister, password: "" });
      name === ""
        ? setIsErrorRegister({ ...isErrorRegister, name: "error" })
        : setIsErrorRegister({ ...isErrorRegister, name: "" });

      const message = "Aviso";
      const description = "Preencha o campo";
      const placement = "topLeft";
      return openNotification("warning", message, description, placement);
    }
    const registerUser = {
      name: name,
      email: email.trim(),
      password: password.trim(),
    };
    setIsLoader(true);
    const res = await register(registerUser);
    console.log(res);
    if (res.success === false) {
      setIsLoader(false);
      const message = "Info";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("info", message, description, placement);
    }
    setTimeout(() => {
      setIsLoader(false);
      setUserRegister({ ...userRegister, email: "", password: "", name: "" });
      setIsRegister(false);
      const message = "Sucesso";
      const description = "Cadastrado com sucesso";
      const placement = "topLeft";
      return openNotification("success", message, description, placement);
    }, 1500);
  };
  const openNotification = (type, message, description, placement) => {
    if (type === "error") {
      api.error({
        message: message,
        description: description,
        placement: placement,
      });
    } else if (type === "info") {
      api.info({
        message: message,
        description: description,
        placement: placement,
      });
    } else if (type === "success") {
      api.success({
        message: message,
        description: description,
        placement: placement,
      });
    } else if (type === "warning") {
      api.warning({
        message: message,
        description: description,
        placement: placement,
      });
    }
  };
  return (
    <div className="containerLogin">
      <div className="infos">
        <h1>
          Organize os processos de jeito <strong>Fácil é Ágil</strong>
        </h1>
      </div>
      {!isRegister && (
        <div className="formLoginI">
          <h1>Pipe Manager 👨‍💻 </h1>
          <Input
            status={isError.email}
            prefix={<MailOutlined />}
            placeholder="Email..."
            className="inpt"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value }) ||
              setIsError({ ...isError, email: "" })
            }
          />
          <Input.Password
            status={isError.password}
            prefix={<LockOutlined />}
            placeholder="Password..."
            className="inpt"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value }) ||
              setIsError({ ...isError, password: "" })
            }
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button
            loading={isLoader}
            type="primary"
            className="inpt"
            onClick={handleLogin}
          >
            Entrar
          </Button>
          <Button
            type="link"
            className="inpt"
            onClick={() => setIsRegister(true)}
          >
            Criar uma conta
          </Button>
        </div>
      )}
      {isRegister && (
        <div className="formLoginI">
          <h1>Pipe Manager 👨‍💻 </h1>
          <h3>
            <Button type="link" onClick={() => setIsRegister(false)}>
              <ArrowLeftOutlined />
            </Button>
            Cadastro
          </h3>
          <Input
            status={isErrorRegister.name}
            prefix={<UserOutlined />}
            placeholder="Nome..."
            className="inpt"
            value={userRegister.name}
            onChange={(e) =>
              setUserRegister({ ...userRegister, name: e.target.value }) ||
              setIsErrorRegister({ ...isErrorRegister, name: "" })
            }
          />
          <Input
            type="email"
            status={isErrorRegister.email}
            prefix={<MailOutlined />}
            placeholder="Email..."
            className="inpt"
            value={userRegister.email}
            onChange={(e) =>
              setUserRegister({ ...userRegister, email: e.target.value }) ||
              setIsErrorRegister({ ...isErrorRegister, email: "" })
            }
          />
          <Input.Password
            type="password"
            status={isErrorRegister.password}
            prefix={<LockOutlined />}
            placeholder="Password..."
            className="inpt"
            value={userRegister.password}
            minLength={4}
            onChange={(e) =>
              setUserRegister({ ...userRegister, password: e.target.value }) ||
              setIsErrorRegister({ ...isErrorRegister, password: "" })
            }
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button
            loading={isLoader}
            type="primary"
            className="inpt"
            onClick={handleRegister}
          >
            Registrar
          </Button>
        </div>
      )}
      {contextHolder}
    </div>
  );
}

export default Login;
