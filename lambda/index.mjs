export const handler = async (event) => {
  console.log("IoT Message Received:", JSON.stringify(event));
  return { statusCode: 200 };
};
