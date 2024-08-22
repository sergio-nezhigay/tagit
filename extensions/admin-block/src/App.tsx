import React, { useEffect, useState } from "react";
import {
  reactExtension,
  useApi,
  AdminBlock,
  Text,
  InlineStack,
  ProgressIndicator,
  Select,
} from "@shopify/ui-extensions-react/admin";
import { getOrderDetails, updateOrder } from "./getOrderDetails";

const TARGET = "admin.order-details.block.render";

export default reactExtension(TARGET, () => <App />);

function App() {
  const { data } = useApi(TARGET);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState("");
  const [value, setValue] = useState("pending");
  const [tags, setTags] = useState([]);
  const orderId = data.selected[0].id;

  useEffect(() => {
    (async function getProductInfo() {
      const details = await getOrderDetails(orderId);
      setLoading(false);
      setTags(details?.tags || []);
      setOrderDetails(JSON.stringify(details, null, 2));
    })();
  }, [orderId]);

  const onStatusChange = async (value: string) => {
    setValue(value);
    await updateOrder({ value, orderId });
  };

  return loading ? (
    <InlineStack blockAlignment="center" inlineAlignment="center">
      <ProgressIndicator size="large-100" />
    </InlineStack>
  ) : (
    <AdminBlock>
      <Text>Loaded order details42...</Text>
      <Text>{orderDetails}</Text>
      {tags.map((tag) => (
        <Text key={tag}>{tag}</Text>
      ))}
      <Select
        label="Order Status"
        value={value}
        onChange={onStatusChange}
        options={[
          {
            value: "pending",
            label: "Pending",
          },
          {
            value: "processing",
            label: "Processing",
          },
          {
            value: "shipped",
            label: "Shipped",
          },
          {
            value: "delivered",
            label: "Delivered",
          },
          {
            value: "cancelled",
            label: "Cancelled",
          },
          {
            value: "returned",
            label: "Returned",
          },
        ]}
      />
    </AdminBlock>
  );
}
