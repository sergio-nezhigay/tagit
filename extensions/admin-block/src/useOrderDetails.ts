import { useEffect, useState } from "react";
import { getOrderDetails } from "./getOrderDetails";

export default function useOrderDetails(
  data: { selected?: Array<{ id: string }> } | undefined,
  query: <T, V>(
    query: string,
    options?: { variables?: V; version?: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ data?: T; errors?: any[] }>
) {
  const [orderDetails, setOrderDetails] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetOrderDetails = async () => {
      try {
        if (data?.selected?.[0]?.id) {
          const orderId = data.selected[0].id;
          const details = await getOrderDetails(orderId, query);
          setOrderDetails(JSON.stringify(details, null, 2));
        } else {
          setError("No order ID found in data.");
        }
      } catch (err) {
        setError(`Error fetching order details: ${(err as Error).message}`);
      }
    };

    fetchAndSetOrderDetails();
  }, [data, query]);

  return { orderDetails, error };
}
