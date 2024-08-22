import { makeGraphQLQuery } from "./makeGraphQLQuery";

export async function getOrderTags(orderId: string): Promise<string[]> {
  const query = `#graphql
      query Order($id: ID!) {
        order(id: $id) {
          tags
        }
      }`;

  const variables = { id: orderId };

  const { data, errors } = await makeGraphQLQuery<{
    order: { tags: string[] };
  }>(query, variables);

  if (errors) {
    const errorMessages = errors.map((e) => e.message).join(", ");
    throw new Error(`Failed to fetch order details: ${errorMessages}`);
  }
  return data?.order?.tags || [];
}

export async function updateOrderTags({
  value,
  orderId,
}: {
  value: string;
  orderId: string;
}): Promise<void> {
  // Step 1: Fetch current tags
  const currentTags = await getOrderTags(orderId);
  //  const currentTags = order?.tags || [];

  // Step 2: Remove all existing tags
  if (currentTags.length > 0) {
    const mutationRemoveTags = `#graphql
        mutation removeTags($id: ID!, $tags: [String!]!) {
          tagsRemove(id: $id, tags: $tags) {
            userErrors {
              field
              message
            }
          }
        }`;

    await makeGraphQLQuery(mutationRemoveTags, {
      id: orderId,
      tags: currentTags,
    });
  }

  // Step 3: Add the new tags
  const mutationAddTags = `#graphql
      mutation addTags($id: ID!, $tags: [String!]!) {
        tagsAdd(id: $id, tags: $tags) {
          userErrors {
            field
            message
          }
          node {
            id
          }
        }
      }`;

  await makeGraphQLQuery(mutationAddTags, {
    id: orderId,
    tags: [value],
  });
}
