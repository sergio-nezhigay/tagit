import React, { useEffect, useState } from "react";
import {
  reactExtension,
  useApi,
  AdminBlock,
  InlineStack,
  ProgressIndicator,
  Select,
} from "@shopify/ui-extensions-react/admin";
import { getOrderTags, updateOrderTags } from "./orderTagsOperations";
import { stages } from "./stages";

const TARGET = "admin.order-details.block.render";

export default reactExtension(TARGET, () => <App />);

function App() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const { data } = useApi(TARGET);
  const orderId = data.selected[0].id;

  useEffect(() => {
    (async function getProductInfo() {
      const tags = await getOrderTags(orderId);
      const currentstage = (tags && tags[0]) || "pending";
      setLoading(false);
      setValue(currentstage);
      await updateOrderTags({ value: currentstage, orderId });
    })();
  }, [orderId]);

  const onStageChange = async (value: string) => {
    setValue(value);
    await updateOrderTags({ value, orderId });
  };

  return loading ? (
    <InlineStack blockAlignment="center" inlineAlignment="center">
      <ProgressIndicator size="large-100" />
    </InlineStack>
  ) : (
    <AdminBlock>
      <Select
        label="Change order stage"
        value={value}
        onChange={onStageChange}
        options={stages}
      />
    </AdminBlock>
  );
}
