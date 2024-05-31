import { Menu } from "antd";
import React from "react";
import CardChamado from "../Card";

function MenuCars({ data, setData, nameProvider }) {
  return (
    <Menu mode="horizontal" title="ok">
      {data?.map(
        (item, index) =>
          item.status === "blue" && (
            <Menu.Item key={index}>
              <CardChamado
                key={index}
                id={item.id}
                title={item.title}
                client={item.client}
                tipeSys={item.tipeSys}
                phone={item.phone}
                tipeInst={item.tipeInst}
                provider={item.provider}
                status={item.status}
                date={item.date}
                setData={setData}
                commits={item.commits}
                nameProvider={nameProvider}
              />
            </Menu.Item>
          )
      )}
    </Menu>
  );
}

export default MenuCars;
