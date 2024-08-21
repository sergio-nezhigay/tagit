import React from "react";
import {
  reactExtension,
  useApi,
  AdminBlock,
  Text,
} from "@shopify/ui-extensions-react/admin";
import useOrderDetails from "./useOrderDetails";

const TARGET = "admin.order-details.block.render";

export default reactExtension(TARGET, () => <App />);

function App() {
  const { data, query } = useApi(TARGET);
  const { orderDetails, error } = useOrderDetails(data, query);

  if (error) {
    return (
      <AdminBlock>
        <Text>Error: {error}</Text>
      </AdminBlock>
    );
  }

  if (!orderDetails) {
    return (
      <AdminBlock>
        <Text>Loading order details...</Text>
        <Text>Order ID: {data?.selected?.[0]?.id || "N/A"}</Text>
      </AdminBlock>
    );
  }

  return (
    <AdminBlock>
      <Text>Order Details:</Text>
      <Text>{orderDetails}</Text>
    </AdminBlock>
  );
}
