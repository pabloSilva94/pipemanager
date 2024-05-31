import {
  DeleteOutlined,
  EyeFilled,
  FieldTimeOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Cascader,
  Popover,
  Space,
  Tag,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import "./style.css";
import { ViewModalCall } from "../Modals";
import Meta from "antd/es/card/Meta";
import { alterAStatusTask } from "../../controller/tasks/alterTask";
import { updateTask } from "../../controller/tasks/localTasks/get";
import { deleteATask } from "../../controller/tasks/deleteTask";
import {
  RiComputerLine,
  RiCustomerServiceLine,
  RiSmartphoneLine,
} from "react-icons/ri";
import { MdOutlineInstallDesktop } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause, TiMediaPlay, TiMediaStop } from "react-icons/ti";
function CardChamado({
  id,
  title,
  provider,
  commits,
  setData,
  client,
  tipeSys,
  tipeInst,
  phone,
  status,
  nameProvider,
  group,
  date,
  user_id,
  socket,
  owner
}) {
  const [modalEditCall, setModalEditCall] = useState(false);
  const [api, contextHolder] = notification.useNotification();
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
    }
  };
  const getStatusInfo = () => {
    let color = "";
    let name = "";

    if (status === "Novo") {
      color = "blue";
      name = "Novo";
    } else if (status === "atendendo") {
      color = "green";
      name = "Em atendimento";
    } else if (status === "espera") {
      color = "orange";
      name = "Em espera";
    } else if (status === "finalizado") {
      color = "darkgray";
      name = "Finalizado";
    }

    return { color, name };
  };
  const { color, name } = getStatusInfo();
  function getCurrentTime() {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
  function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const handleAlter = async (id) => {

    const taskBody = {
      id: id,
      group_id: group,
      status: "atendendo",
      commits: [
        {
          idCommit: Math.random().toString(36).substring(2),
          provider: nameProvider,
          commit: `${nameProvider} alterou para atendendo`,
          date: getCurrentDate(),
          time: getCurrentTime(),
        },
      ],
    };
    const res = await alterAStatusTask(taskBody);
    if (res.success === false) {
      const message = "Error";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
    const newTasks = res.data;
    const task = updateTask(newTasks);
    setData(task.data);
    socket.emit("tasks", newTasks);
    if (task.success === false) {
      const message = "Error";
      const description = `${task.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
  };
  const handlePause = async (id) => {
    const taskBody = {
      id: id,
      group_id: group,
      status: "espera",
      commits: [
        {
          idCommit: Math.random().toString(36).substring(2),
          provider: nameProvider,
          commit: `${nameProvider} alterou para espera`,
          date: getCurrentDate(),
          time: getCurrentTime(),
        },
      ],
    };
    const res = await alterAStatusTask(taskBody);
    if (res.success === false) {
      const message = "Error";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
    const newTasks = res.data;
    const task = updateTask(newTasks);
    setData(task.data);
    socket.emit("tasks", newTasks);
    if (task.success === false) {
      const message = "Error";
      const description = `${task.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
  };
  const handleFinalizar = async (id) => {
    const taskBody = {
      id: id,
      group_id: group,
      status: "finalizado",
      commits: [
        {
          idCommit: Math.random().toString(36).substring(2),
          provider: nameProvider,
          commit: `${nameProvider} Finalizou a tarefa`,
          date: getCurrentDate(),
          time: getCurrentTime(),
        },
      ],
    };
    const res = await alterAStatusTask(taskBody);
    if (res.success === false) {
      const message = "Error";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
    const newTasks = res.data;
    const task = updateTask(newTasks);
    setData(task.data);
    socket.emit("tasks", newTasks);
    if (task.success === false) {
      const message = "Error";
      const description = `${task.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
  };
  const handleDel = async (id) => {
    const taskBody = {
      id: id,
      user_id: user_id,
      group_id: group,
    };

    try {
      const res = await deleteATask(taskBody);

      if (res.success) {
        const newTasks = res.data;
        const task = updateTask(newTasks);
        setData(task.data);
        socket.emit("tasks", newTasks);
        notification.info({
          message: "Info",
          description: "Tarefa excluida!",
        });
      } else {
        notification.error({
          message: "Erro",
          description: res.message || "Falha ao deletar!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `${error.message}`,
      });
    }
  };

  const openModalEdit = (id) => {
    setModalEditCall(true);
  };
  const statusClass = status === "darkgray" ? "cEnd" : "";
  return (
    <>
      <Card
        hoverable={true}
        title={
          <h1 id="titleCard" className={statusClass}>
            {title}
          </h1>
        }
        extra={
          <Space>
            <Tag color={color} className="tag">
              {name}
            </Tag>
            <Button danger type="link" onClick={() => handleDel(id)}>
              <DeleteOutlined />
            </Button>
          </Space>
        }
        actions={[
          <Button onClick={() => openModalEdit(id)} type="text">
            <EyeFilled style={{ color: "#666", fontSize: 20 }} />
          </Button>,

          status === "Novo" && (
            <Popover title="Atender" placement="bottom">
              <Button
                icon={<TiMediaPlay color="#65B542" />}
                className="btn"
                onClick={() => handleAlter(id)}
                style={{ background: "#F6FFED", borderColor: "#65B542 " }}
              />
            </Popover>
          ),
          status === "finalizado" ||
            (status === "espera" && (
              <Popover title="Atender" placement="bottom">
                <Button
                  icon={<TiMediaPlay color="#65B542" />}
                  className="btn"
                  style={{ background: "#F6FFED", borderColor: "#65B542 " }}
                  type="primary"
                  ghost
                  onClick={() => handleAlter(id)}
                />
              </Popover>
            )),
          status !== "espera" &&
            status !== "Novo" &&
            status !== "finalizado" && (
              <Popover title="Pausar" placement="bottom">
                <Button
                  icon={<TiMediaPause />}
                  className="btn"
                  onClick={() => handlePause(id)}
                  style={{
                    background: "moccasin",
                    color: "darkorange",
                    borderColor: "darkorange",
                  }}
                />
              </Popover>
            ),
          status !== "finalizado" && (
            <Popover title="Finalizar" placement="bottom">
              <Button
                icon={<TiMediaStop />}
                className="btn"
                onClick={() => handleFinalizar(id)}
                style={{
                  background: "darkgray",
                  color: "white",
                  borderColor: "lightgray",
                }}
              />
            </Popover>
          ),
        ]}
      >
        <Meta
          description={
            <Space direction="vertical">
              <p>
                <strong>ID Group {group}</strong>
              </p>
              <p className={statusClass}>
                <UserOutlined /> {client}
              </p>
              <p className={statusClass}>
                <RiComputerLine /> {tipeSys}
              </p>
              <p className={statusClass}>
                <RiSmartphoneLine /> {phone}
              </p>
              <p className={statusClass}>
                <MdOutlineInstallDesktop /> {tipeInst}
              </p>
              <p className={statusClass}>
                <RiCustomerServiceLine /> {owner}
              </p>
            </Space>
          }
        />
      </Card>
      <ViewModalCall
        isOpen={modalEditCall}
        isClose={setModalEditCall}
        status={status}
        title={title}
        client={client}
        tipeSys={tipeSys}
        phone={phone}
        tipeInst={tipeInst}
        id={id}
        commits={commits}
        nameProvider={nameProvider}
        setData={setData}
        group={group}
        user_id={user_id}
        date={date}
        socket={socket}
        owner={owner}
      />
      {contextHolder}
    </>
  );
}

export default CardChamado;
