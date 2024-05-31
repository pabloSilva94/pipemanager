import React from "react";
import { Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";


export function SelectCustomers({ customers, newCall, setNewCall, selectedCustomer, setSelectedCustomer }) {
  const optionCustomers = customers?.map((customer) => ({
    value: customer.id,
    label: customer.name,
    key: customer.id,
  }));
  const handleChange = (value) => {
    setNewCall({...newCall, customers_id:value})
    setSelectedCustomer(value);
  };
  return (
    <Select
      style={{
        width: "100%",
      }}
      placeholder="Selecione o cliente"
      onChange={handleChange}
      options={optionCustomers}
      value={selectedCustomer}
    />
  );
}
