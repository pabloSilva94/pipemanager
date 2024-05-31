import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getLocal } from "../../controller/groups/localStorage/get";
import { logout } from "../../controller/loginPovider";
import { getAllTasks } from "../../controller/tasks/getTask";
import { getLocalTask } from "../../controller/tasks/localTasks/get";
import { getLocalCostumer } from "../../controller/customers/localCostumers/get";
import { getACustomers } from "../../controller/customers/getCustomer";
import { useNavigate } from "react-router-dom";
import {
  Affix,
  Button,
  Card,
  Collapse,
  Drawer,
  Menu,
  Space,
  Tag,
  notification,
} from "antd";
import "./Home.css";
import {
  ArrowDownOutlined,
  MailFilled,
  MailOutlined,
  PlusCircleFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import CardChamado from "../../components/Card";
import {
  AddModalCall,
  AddModalCustomers,
  AddModalProviders,
} from "../../components/Modals";
import { addItemFromJson } from "react-lf-tools";
import { IoMenu } from "react-icons/io5";
import { MenuDrawer } from "../../components/MenuDrawer";
import { TbReportSearch } from "react-icons/tb";
import { CollapseCall } from "../../components/CollapseCall";
const api = import.meta.env.VITE_API_URL_DEV;
// Conexão com o servidor socket.io
const socket = io(api); // Substitua pelo endereço correto do seu servidor

function Home() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [data, setData] = useState(null);
  const [groupsApi, setGroupsApi] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [modalNewCall, setModelNewCall] = useState(false);
  const [modalNewCostumer, setModelNewCostumer] = useState(false);
  const [modalNewProvider, setModelNewProvider] = useState(false);
  const [open, setOpen] = useState(false);

  const [nameProvider, setNameProvider] = useState("");

  const openModelAddNewCall = () => {
    setModelNewCall(true);
    handleGetCustomers();
  };
  const openModelAddNewCustomers = () => {
    setModelNewCostumer(true);
  };
  const openModelAddNewProvider = () => {
    setModelNewProvider(true);
  };
  const openMenu = () => {
    setOpen(true);
  };

  const handleGetlocal = () => {
    const res = getLocal();
    if (res.success === false) {
      return console.log(res.message);
    }
    setGroupsApi(res.data);
    const resCustomers = getLocalCostumer();
    if (resCustomers.success === true) {
      setCustomers(resCustomers.data);
    }
    const resTask = getLocalTask();
    if (resTask.success === false && res.success === true) {
      let group_id = res.data.group[0]
        ? res.data.group[0].id
        : res.data.group.id;
      handleGetTask(group_id);
    }
    setData(resTask.data);
  };

  const handleLogout = () => {
    const res = logout();
    if (res.success === true) {
      return navigate("/login", { replace: true });
    }
    console.log(res.message);
  };

  const handleGetCustomers = async () => {
    const customersBody = {
      user_id: groupsApi?.adm ? groupsApi.id : groupsApi.group.user_id ,
    };

    const res = await getACustomers(customersBody);
    if (res.success === false) {
      console.log(res.message);
    }
    setCustomers(res.data);
  };

  useEffect(() => {
    socket.on("tasks", (newTask) => {
      console.log(newTask);
      setData(newTask);
    });

    return () => {
      socket.off("tasks");
    };
  }, []);
  useEffect(() => {
    const prov = getLocal();
    if (prov.success === false) {
      return navigate("/login", { replace: true });
    }
    handleGetlocal();
  }, []);

  const teste = () => {
    console.log(groupsApi.group[0].id);
  };
  const handleGetTask = async (group_id) => {
    try {
      const taskBody = {
        group_id: group_id,
      };
      const res = await getAllTasks(taskBody);
      if (res.success === false) {
        console.log(res.message);
      }
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          <Button className="btnTitle" type="link" onClick={openMenu}>
            <IoMenu />
          </Button>
          Pipe Manager
        </h1>
        <div className="hi2">
          <Space direction="vertical">
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Olá, {groupsApi?.name}
              <div className="btnHMobile">
                <Button onClick={openModelAddNewCustomers} type="primary" ghost>
                  <UserAddOutlined />
                </Button>
                <Button type="primary" onClick={openModelAddNewProvider}>
                  <MailOutlined />
                </Button>
                <Button onClick={handleLogout}>Sair</Button>
              </div>
            </h4>
            <h1 className="titleMobile">👨‍💻 Gestão de Chamados</h1>
          </Space>
        </div>
      </header>
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        key="left"
        size="default"
      >
        <MenuDrawer
          modalCostumer={openModelAddNewCustomers}
          modalProvider={openModelAddNewProvider}
          logout={logout}
        />
      </Drawer>
      <div className="main">
        <div className="mNew">
          <Tag color="blue" style={{ display: "flex", alignItems: "center" }}>
            Novos Chamados
            <Button type="text" onClick={openModelAddNewCall}>
              <PlusCircleFilled style={{ color: "blue", fontSize: 20 }} />
            </Button>
          </Tag>
          {data?.map((card, index) =>
            card.status === "Novo" ? (
              <CardChamado
                id={card.id}
                key={index}
                title={card.title}
                provider={card.title}
                commits={card.commits}
                setData={setData}
                client={card.customers?.name}
                tipeSys={card.type_sys}
                tipeInst={card.type_inst}
                phone={card.customers?.phone}
                status={card.status}
                nameProvider={groupsApi?.name}
                group={card.group_id}
                user_id={card.user_id}
                owner={card.owner}
                socket={socket}
              />
            ) : null
          )}
        </div>
        <div className="mService">
          <Tag
            color="green"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 35,
            }}
          >
            Em Atendimento
          </Tag>
          {data?.map((card, index) =>
            card.status === "atendendo" ? (
              <CardChamado
                id={card.id}
                key={index}
                title={card.title}
                provider={card.title}
                commits={card.commits}
                setData={setData}
                client={card.customers?.name}
                tipeSys={card.type_sys}
                tipeInst={card.type_inst}
                phone={card.customers?.phone}
                status={card.status}
                nameProvider={groupsApi?.name}
                group={card.group_id}
                user_id={card.user_id}
                owner={card.owner}
                socket={socket}
              />
            ) : null
          )}
        </div>
        <div className="mWaiting">
          <Tag
            color="orange"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 35,
            }}
          >
            Em Espera
          </Tag>
          {data?.map((card, index) =>
            card.status === "espera" ? (
              <CardChamado
                id={card.id}
                key={index}
                title={card.title}
                provider={card.title}
                commits={card.commits}
                setData={setData}
                client={card.customers?.name}
                tipeSys={card.type_sys}
                tipeInst={card.type_inst}
                phone={card.customers?.phone}
                status={card.status}
                nameProvider={groupsApi?.name}
                group={card.group_id}
                user_id={card.user_id}
                owner={card.owner}
                socket={socket}
              />
            ) : null
          )}
        </div>
        <div className="mCallEnd">
          <Tag
            color="darkgray"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 35,
            }}
          >
            Chamados Finalizados
          </Tag>
          {data?.map((card, index) =>
            card.status === "finalizado" ? (
              <CardChamado
                id={card.id}
                key={index}
                title={card.title}
                provider={card.title}
                commits={card.commits}
                setData={setData}
                client={card.customers?.name}
                tipeSys={card.type_sys}
                tipeInst={card.type_inst}
                phone={card.customers?.phone}
                status={card.status}
                nameProvider={groupsApi?.name}
                group={card.group_id}
                user_id={card.user_id}
                owner={card.owner}
                socket={socket}
              />
            ) : null
          )}
        </div>
      </div>
      <div className="mobile">
        <CollapseCall
          data={data}
          groupsApi={groupsApi}
          socket={socket}
          openModelAddNewCall={openModelAddNewCall}
          setData={setData}
        />
      </div>
      <AddModalCall
        setData={setData}
        data={data}
        groupsApi={groupsApi}
        setGroupsApi={setGroupsApi}
        isOpen={modalNewCall}
        isClose={setModelNewCall}
        nameProvider={nameProvider}
        customers={customers}
        socket={socket}
      />
      <AddModalCustomers
        isOpen={modalNewCostumer}
        isClose={setModelNewCostumer}
        groupsApi={groupsApi}
        setGroupsApi={setGroupsApi}
      />
      <AddModalProviders
        isOpen={modalNewProvider}
        isClose={setModelNewProvider}
        groupsApi={groupsApi}
      />
      {contextHolder}
    </div>
  );
}

export default Home;
