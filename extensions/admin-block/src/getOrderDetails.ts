export async function getOrderDetails(
  orderId: string,
  query: <T, V>(
    query: string,
    options?: { variables?: V; version?: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ data?: T; errors?: any[] }>
) {
  const { data, errors } = await query<
    { order: { id: string; name: string } },
    { id: string }
  >(
    `#graphql
      query Order($id: ID!) {
        order(id: $id) {
          id
          name
          totalPriceSet {
            shopMoney {
              amount
            }
          }
          tags
        }
      }`,
    {
      variables: { id: orderId },
    }
  );

  if (errors) {
    throw new Error(
      "Failed to fetch order details: " +
        errors.map((e) => e.message).join(", ")
    );
  }

  return data?.order;
}
