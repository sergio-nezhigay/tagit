type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function getOrderDetails(
  orderId: string
): Promise<{ id: string; name: string; tags: string[] } | undefined> {
  const query = `#graphql
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
      }`;

  const variables = { id: orderId };

  const { data, errors } = await makeGraphQLQuery<{
    order: { id: string; name: string; tags: string[] };
  }>(query, variables);

  if (errors) {
    throw new Error(
      "Failed to fetch order details: " +
        errors.map((e) => e.message).join(", ")
    );
  }

  return data?.order;
}

export async function updateOrder({
  value,
  orderId,
}: {
  value: string;
  orderId: string;
}): Promise<void> {
  console.log("==========updateOrder===============");
  console.log(value, orderId);
  console.log("====================================");
}

async function makeGraphQLQuery<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<GraphQLResponse<T>> {
  const graphQLQuery = {
    query,
    variables,
  };

  const res = await fetch("shopify:admin/api/graphql.json", {
    method: "POST",
    body: JSON.stringify(graphQLQuery),
  });

  if (!res.ok) {
    throw new Error("Network error");
  }

  return (await res.json()) as GraphQLResponse<T>;
}
