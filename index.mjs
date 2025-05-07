import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

const cloudwatch = new CloudWatchClient({ region: "us-east-1" });

export const handler = async (event) => {
  console.log("IoT Message Received:", JSON.stringify(event));

  try {
    // Since IoT Rule uses plain JSON, use the event directly
    const payload = event;

    if (payload.status === "stored") {
      const metric = new PutMetricDataCommand({
        Namespace: "Factory",
        MetricData: [
          {
            MetricName: "ItemsStored",
            Dimensions: [{ Name: "Color", Value: payload.color || "unknown" }],
            Unit: "Count",
            Value: 1
          }
        ]
      });

      await cloudwatch.send(metric);
      console.log("Metric sent to CloudWatch: ItemsStored, Color =", payload.color);
    }
  } catch (err) {
    console.error("Metric Error:", err);
  }

  return { statusCode: 200 };
};
