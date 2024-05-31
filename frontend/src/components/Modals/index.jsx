import {
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Switch,
  Tag,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { maskCPF, maskPhone } from "react-lf-tools";
import Meta from "antd/es/card/Meta";
import { createACustomers } from "../../controller/customers/newCustomer";
import {
  getLocalCostumer,
  updateCostumer,
} from "../../controller/customers/localCostumers/get";
import { SelectCustomers } from "../SelectCustomers";
import { createATask } from "../../controller/tasks/newTask";
import { updateTask } from "../../controller/tasks/localTasks/get";
import { MdOutlineTitle } from "react-icons/md";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailFilled,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegAddressCard } from "react-icons/fa";
import { CiMapPin } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { addACommitTask } from "../../controller/tasks/alterTask";
import { createAProvider } from "../../controller/providers/newProvider";
export function AddModalCall({
  isOpen,
  isClose,
  data,
  setData,
  nameProvider,
  groupsApi,
  setGroupsApi,
  customers,
  socket,
}) {
  const [api, contextHolder] = notification.useNotification();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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
  const [newCall, setNewCall] = useState({
    title: "",
    client: "",
    type_sys: "",
    phone: "",
    type_inst: "",
    provider: "",
    customers_id: "",
  });
  const handleCancel = () => {
    isClose(false);
    setSelectedCustomer(null);
    setNewCall({
      title: "",
      client: "",
      tipeSys: "",
      phone: "",
      tipeInst: "",
      provider: "",
    });
  };

  const handleOk = async () => {
    const taskBody = {
      title: newCall.title,
      type_sys: newCall.type_sys,
      type_inst: newCall.type_inst,
      owner: groupsApi.adm ? groupsApi.name : groupsApi.name,
      customers_id: newCall.customers_id,
      user_id: groupsApi.adm ? groupsApi.id : groupsApi.group.user_id,
      group_id: groupsApi.group[0] ? groupsApi.group[0].id : groupsApi.group.id,
      commits: [
        {
          idCommit: Math.random().toString(36).substring(2),
          provider: groupsApi.adm ? groupsApi.name : groupsApi.name,
          commit: "Criou a tarefa",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
      ],
    };

    try {
      const res = await createATask(taskBody);

      if (res.success) {
        const newTasks = res.data;
        const task = updateTask(newTasks);
        setData(task.data);
        socket.emit("tasks", newTasks);
        notification.success({
          message: "Sucesso",
          description: "Tarefa criada com sucesso!",
        });
        handleCancel();
      } else {
        notification.error({
          message: "Erro",
          description: res.message || "Falha ao criar tarefa!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `${error.message}`,
      });
    }
  };

  return (
    <Modal open={isOpen} onCancel={handleCancel} onOk={handleOk}>
      <h1>Novo Chamado</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Input
          value={newCall.title}
          placeholder="Titulo"
          onChange={(e) => setNewCall({ ...newCall, title: e.target.value })}
          prefix={<MdOutlineTitle />}
        />
        <SelectCustomers
          customers={customers}
          setNewCall={setNewCall}
          newCall={newCall}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />

        <Input
          value={newCall.type_sys}
          placeholder="Tipo do sistema"
          onChange={(e) => setNewCall({ ...newCall, type_sys: e.target.value })}
        />
        <Radio.Group
          value={newCall.type_inst}
          defaultValue={"Presencial"}
          optionType="button"
          buttonStyle="solid"
          style={{ display: "flex", gap: 10 }}
          onChange={(e) =>
            setNewCall({ ...newCall, type_inst: e.target.value })
          }
        >
          <Radio value={"Presencial"}>Presencial</Radio>
          <Radio value={"Remoto"}>Remoto</Radio>
        </Radio.Group>
      </div>
      {contextHolder}
    </Modal>
  );
}

export function ViewModalCall({
  status,
  title,
  client,
  tipeSys,
  phone,
  tipeInst,
  date,
  id,
  data,
  setData,
  isOpen,
  isClose,
  commits,
  nameProvider,
  group,
  user_id,
  socket,
  owner
}) {
  const [commitProvider, setCommitProvider] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const { TextArea } = Input;
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

  const handleCancel = () => {
    isClose(false);
    setCommitProvider("");
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
  const onChange = (e) => {
    setCommitProvider(e.target.value);
  };
  const handleAddCommit = async (id) => {
    const taskBody = {
      id: id,
      group_id: group,
      status: status,
      commits: [
        {
          idCommit: Math.random().toString(36).substring(2),
          provider: nameProvider,
          commit: commitProvider,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    try {
      const res = await addACommitTask(taskBody);

      if (res.success) {
        const newTasks = res.data;
        const task = updateTask(newTasks);
        setData(task.data);
        socket.emit("tasks", newTasks);
        notification.info({
          message: "success",
          description: "Comentario adicionado com sucesso",
        });
      } else {
        notification.error({
          message: "Erro",
          description: res.message || "Falha ao comentar!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `${error.message}`,
      });
    }
  };
  commits.sort((a, b) => {
    if (a.time > b.time) {
      return -1;
    }
    if (a.time < b.time) {
      return 1;
    }
    return 0;
  });

  return (
    <Modal open={isOpen} onCancel={handleCancel} onOk={handleCancel}>
      <Tag color={color}>{name}</Tag>
      <h1>{title}</h1>
      <h2>{client}</h2>
      <h2>{tipeSys}</h2>
      <h2>{phone}</h2>
      <h2>{tipeInst}</h2>
      <h2>{owner}</h2>
      {status !== "finalizado" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 20,
          }}
        >
          <TextArea
            showCount
            maxLength={100}
            onChange={onChange}
            placeholder="Comentarios..."
            style={{
              height: 120,
              resize: "none",
              marginBottom: 20,
            }}
            value={commitProvider}
          />
          <Button onClick={() => handleAddCommit(id)} style={{ width: 70 }}>
            Salvar
          </Button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "300px",
        }}
      >
        {commits.map((c, index) => (
          <Card
            key={index}
            title={
              <Space>
                <Avatar src="https://api.dicebear.com/8.x/thumbs/svg?flip=false" />
                <h3>{c.provider}</h3>
              </Space>
            }
            extra={
              <Space>
                <p>{c.date}</p>
                <p>{c.time}</p>
              </Space>
            }
            style={{
              width: "100%",
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <Meta description={c.commit} />
          </Card>
        ))}

        {contextHolder}
      </div>
    </Modal>
  );
}

export function AddModalCustomers({
  isOpen,
  isClose,
  date,
  nameProvider,
  groupsApi,
  setGroupsApi,
}) {
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
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    cpf: "",
    cnpj: "",
    phone: "",
    address: "",
    cnpj: "",
  });
  const [isSwitch, setIsSwitch] = useState(true);
  const handleCancel = () => {
    isClose(false);
    setNewCustomer({
      name: "",
      cpf: "",
      cnpj: "",
      phone: "",
      address: "",
    });
  };
  const handleMaskedPhone = (e) => {
    const phone = e.target.value;
    const masked = maskPhone(phone);
    setNewCustomer({ ...newCustomer, phone: masked });
  };
  const handleMaskCpf = (e) => {
    const cpf = e.target.value;
    const masked = maskCPF(cpf);
    return setNewCustomer({ ...newCustomer, cpf: masked });
  };
  const handleMaskCnpj = (e) => {
    const cnpj = e.target.value;
    const masked = maskCPF(cnpj);
    return setNewCustomer({ ...newCustomer, cnpj: masked });
  };
  const handleOk = async () => {
    const customersBody = {
      name: newCustomer.name,
      cpf: newCustomer.cpf,
      cnpj: newCustomer.cnpj,
      address: newCustomer.address,
      phone: newCustomer.phone,
      user_id: groupsApi.adm ? groupsApi.id : groupsApi.group.user_id,
    };
    const res = await createACustomers(customersBody);

    if (res.success === false) {
      console.log(res.message);
      const message = "Error";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
    const costumerBody = res.data;
    updateCostumer(costumerBody);

    setTimeout(() => {
      isClose(false);
      setNewCustomer({
        name: "",
        cpf: "",
        cnpj: "",
        phone: "",
        address: "",
      });
    }, 1000);
  };

  return (
    <Modal open={isOpen} onCancel={handleCancel} onOk={handleOk}>
      <h1>Novo Cliente</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Space>
          <h4>Pessoa fisica?</h4>
          <Switch
            defaultChecked
            onChange={
              isSwitch ? () => setIsSwitch(false) : () => setIsSwitch(true)
            }
          />
        </Space>
        <Input
          value={newCustomer.name}
          prefix={<UserOutlined />}
          placeholder="Nome"
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        {isSwitch === true ? (
          <Input
            value={newCustomer.cnpj}
            placeholder="CNPJ"
            onChange={handleMaskCnpj}
            maxLength={18}
            prefix={<FaRegAddressCard />}
          />
        ) : (
          <Input
            value={newCustomer.cpf}
            placeholder="CPF"
            onChange={handleMaskCpf}
            maxLength={14}
            prefix={<FaRegAddressCard />}
          />
        )}
        <Input
          value={newCustomer.phone}
          placeholder="Telefone de contato"
          onChange={handleMaskedPhone}
          prefix={<PhoneOutlined />}
        />

        <Input
          value={newCustomer.address}
          placeholder="Endereço"
          prefix={<LuMapPin />}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, address: e.target.value })
          }
        />
      </div>
      {contextHolder}
    </Modal>
  );
}
export function AddModalProviders({ isOpen, isClose, groupsApi }) {
  const [api, contextHolder] = notification.useNotification();
  const [isError, setIsError] = useState({ email: "", password: "", name: "" });
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
  const [newProvider, setNewProvider] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleCancel = () => {
    isClose(false);
    setNewProvider({
      name: "",
      email: "",
      password: "",
    });
    setIsError({
      name: "",
      email: "",
      password: "",
    });
  };
  const validateFields = () => {
    let errors = {};
    let hasErrors = false;

    if (newProvider.name === "") {
      errors.name = "error";
      hasErrors = true;
    } else {
      errors.name = "";
    }

    if (newProvider.email === "") {
      errors.email = "error";
      hasErrors = true;
    } else {
      errors.email = "";
    }

    if (newProvider.password === "") {
      errors.password = "error";
      hasErrors = true;
    } else {
      errors.password = "";
    }

    setIsError(errors);
    return hasErrors;
  };
  const handleOk = async () => {
    const { name, email, password } = newProvider;
    if (validateFields()) {
      return;
    }
    const providerBody = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      user_id: groupsApi.adm ? groupsApi.id : groupsApi.group.user_id,
      group_id: groupsApi?.adm ? groupsApi?.group[0].id : groupsApi.group.id,
    };
    const res = await createAProvider(providerBody);

    if (res.success === false) {
      console.log(res.message);
      const message = "Error";
      const description = `${res.message}`;
      const placement = "topLeft";
      return openNotification("error", message, description, placement);
    }
    setTimeout(() => {
      isClose(false);
      setNewProvider({
        name: "",
        email: "",
        password: "",
      });
    }, 1000);
  };

  return (
    <Modal open={isOpen} onCancel={handleCancel} onOk={handleOk}>
      <h1>Convidar um Usuario</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Input
          status={isError.name}
          value={newProvider.name}
          placeholder="Nome"
          prefix={<UserOutlined />}
          onChange={(e) =>
            setNewProvider({ ...newProvider, name: e.target.value }) ||
            setIsError({ ...isError, name: "" })
          }
        />
        <Input
          prefix={<MailOutlined />}
          status={isError.email}
          value={newProvider.email}
          placeholder="email"
          onChange={(e) =>
            setNewProvider({ ...newProvider, email: e.target.value }) ||
            setIsError({ ...isError, email: "" })
          }
        />
        <Input.Password
          status={isError.password}
          prefix={<LockOutlined />}
          placeholder="Senha..."
          value={newProvider.password}
          onChange={(e) =>
            setNewProvider({ ...newProvider, password: e.target.value }) ||
            setIsError({ ...isError, password: "" })
          }
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>
      {contextHolder}
    </Modal>
  );
}
