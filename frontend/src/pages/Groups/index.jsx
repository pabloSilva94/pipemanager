import React, { useEffect, useState } from "react";
import { addItemFromJson } from "react-lf-tools";
import io from "socket.io-client";
import { Button, Card, Input, Modal, Space, Tag, Tooltip } from "antd";
import {
  getLocal,
  updateGroups,
} from "../../controller/groups/localStorage/get";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { createAGroup } from "../../controller/groups/newGroup";
import { delAGroup } from "../../controller/groups/delGroup";

import "./Groups.css";
import { logout } from "../../controller/loginPovider";
import { useNavigate } from "react-router-dom";
const socket = io(import.meta.env.VITE_API_URL_DEV);

function Groups() {
  const navigate = useNavigate();

  const [groupsApi, setGroupsApi] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState("");
  const [title, setTitle] = useState("");

  const handleCreateGroup = async () => {
    if (title === "") {
      return setIsError("error");
    } else if (title.length <= 5) {
      return setIsError("Precisa ter no mínimo 5 caracteres");
    }
    setLoading(true);
    const groupBody = {
      user_id: groupsApi.id,
      title: title,
    };
    const res = await createAGroup(groupBody);
    if (res.success === false) {
      console.log(res.message);
    } else {
      console.log(res.message);
      console.log(res.data);
      const userBody = res.data;

      const user = updateGroups(userBody);
      if (user.success === true) {
        handleGetlocal();
      } else {
        console.log(user.message);
      }
    }
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setIsError("");
      setTitle("");
      handleGetlocal();
    }, 1500);
  };

  const handleDeleteGroup = async (id) => {
    const groupBody = {
      id: id,
      user_id: groupsApi.id, // Alterado para acessar diretamente a propriedade 'id'
    };
    const res = await delAGroup(groupBody);

    if (res.success === false) {
      return console.log(res.message);
    }
    socket.emit("deleteGroup", id);
    const userBody = res.data;

    const user = updateGroups(userBody);
    if (user.success === true) {
      return handleGetlocal();
    } else {
      console.log(user.message);
    }
  };

  const handleGetlocal = () => {
    const res = getLocal();
    if (res.success === false) {
      return console.log(res.message);
    }
    const user = addItemFromJson(res.data);
    console.log("Log effect", user, "ok");
    setGroupsApi(user);
  };

  const handleLogout = () => {
    const res = logout();

    if (res.success === true) {
      return navigate("/login", { replace: true });
    }
    console.log(res.message);
  };
  const handelGroup = () => {
    return navigate("/home", { replace: true });
  };
  useEffect(() => {
    handleGetlocal();
  }, []);
  return (
    <div className="containerGroups">
      <header className="headerHeader">
        <h1 className="title">Pipe Manager</h1>
        <div className="hi2">
          <Space direction="vertical">
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.9em",
                gap: "5px",
              }}
            >
              Olá, {groupsApi?.name}
              <Button onClick={handleLogout}>Sair</Button>
            </h4>
            <h1 className="titleGroup">👨‍💻 Gestão de Chamados</h1>
          </Space>
        </div>
      </header>
      <div className="listGroups">
        <h1>Lista dos grupos</h1>
        <div className="lGroupsCard">
          {groupsApi && groupsApi.group?.length > 0 ? (
            groupsApi?.group.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                extra={
                  <Space>
                    <Button type="primary" ghost onClick={handelGroup}>
                      Ir
                    </Button>
                    {groupsApi?.adm === true && (
                      <Button
                        type="primary"
                        danger
                        ghost
                        onClick={() => handleDeleteGroup(item.id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    )}
                  </Space>
                }
                bordered={false}
              >
                <h3>Cod. #{item.code_group}</h3>
              </Card>
            ))
          ) : groupsApi.group?.length >0 ? (
            <Card
              key={groupsApi.group.id}
              title={groupsApi.group.title}
              extra={
                <Space>
                  <Button type="primary" ghost onClick={handelGroup}>
                    Ir
                  </Button>
                </Space>
              }
              bordered={false}
            >
              <h3>Cod. #{groupsApi.group.code_group}</h3>
            </Card>
          ) : (
            <h3 className="titleCard">Você não possui grupos ativos</h3>
          )}
        </div>
        {groupsApi?.group?.length === 0 ? (
          <Button type="primary" onClick={() => setOpen(true)}>
            Criar
          </Button>
        ) : (
          ""
        )}
      </div>
      <Modal
        title="Cadastro de grupo"
        open={open}
        onCancel={() => setOpen(false) || setTitle("") || setIsError("")}
        confirmLoading={loading}
        onOk={handleCreateGroup}
      >
        <Input
          placeholder="Titulo"
          status={isError}
          value={title}
          onChange={(e) => setTitle(e.target.value) || setIsError("")}
          minLength={5}
          suffix={
            isError === "Precisa ter no mínimo 5 caracteres" && (
              <Tooltip title={isError}>
                <InfoCircleOutlined style={{ color: "red" }} />
              </Tooltip>
            )
          }
        />
      </Modal>
    </div>
  );
}

export default Groups;
