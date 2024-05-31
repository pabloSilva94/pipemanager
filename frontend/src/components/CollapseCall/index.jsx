import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Collapse, Tag } from "antd"
import CardChamado from "../Card";

export const CollapseCall =({data, openModelAddNewCall, groupsApi, socket, setData})=>{
    const items = [
        {
          key: "1",
          label: (
            <Tag
              color="blue"
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              Novos Chamados
              <Button type="text" onClick={openModelAddNewCall}>
                <PlusCircleFilled style={{ color: "blue", fontSize: 20 }} />
              </Button>
            </Tag>
          ),
          children: (
            <div className="cardsMobile">
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
                    socket={socket}
                    owner={card.owner}

                  />
                ) : null
              )}
            </div>
          ),
        },
        {
          key: "2",
          label: (
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
          ),
          children: (
            <div className="cardsMobile">
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
                    socket={socket}
                    owner={card.owner}

                  />
                ) : null
              )}
            </div>
          ),
        },
        {
          key: "3",
          label: (
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
          ),
          children: (
            <div className="cardsMobile">
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
                    socket={socket}
                    owner={card.owner}

                  />
                ) : null
              )}
            </div>
          ),
        },
        {
          key: "4",
          label: (
            <Tag
              color="darkgray"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: 35,
              }}
            >
              Finalizados
            </Tag>
          ),
          children: (
            <div className="cardsMobile">
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
                  socket={socket}
                  owner={card.owner}

                />
                ) : null
              )}
            </div>
          ),
        },
      ];
    return(
        <Collapse items={items} />

    )
}
