// index.mjs

import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";
const cloudwatch = new CloudWatchClient({ region: "us-east-1" });


export const handler = async (event) => {
  // For debugging: log the raw incoming event
  console.log("Incoming Event:", JSON.stringify(event, null, 2));

  // -------------------------------
  // TEMP TEST MODE (while IoT Core is not connected)
  // Uncomment this section if you're testing in Lambda directly
  // and your test event has the payload inside a wrapper (optional)
  //
  // Example wrapper format:
  // {
  //   "test": true,
  //   "payload": {
  //     "type": "dashboardOrder",
  //     "order_id": "ORD123",
  //     "state": "in_process",
  //     "color": "blue"
  //   }
  // }

  // If your test event uses a wrapper, uncomment this:
  // const payload = event.payload || event;

  // Default for now: assume direct test payload (no wrapper)
  const payload = event;

  // -------------------------------
  // WHEN USING IOT CORE:
  // If your IoT Rule is: SELECT * FROM 'factory/topic'
  // Then AWS IoT will pass the payload directly (same as above)
  // If you customize the IoT Rule, you may need to change how 'payload' is extracted

  const type = payload.type;

  switch (type) {
    case "dashboardOrder":
      await handleDashboardOrder(payload);
      break;

    case "rawMaterialOrder":
      await handleRawMaterialOrder(payload);
      break;

    case "factoryStatus":
      await handleFactoryStatus(payload);
      break;

    case "stock":
      await handleStock(payload);
      break;

    case "nfcReader":
      await handleNfcReader(payload);
      break;

    default:
      console.warn(`Unknown message type: ${type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Event of type '${type}' processed successfully.` })
  };
};

// 1. Handle Order Dashboard Updates
async function handleDashboardOrder(event) {
  const { order_id, state, color } = event;

  console.log(`[Order] ID=${order_id}, State=${state}, Color=${color}`);

  const metricCommand = new PutMetricDataCommand({
    Namespace: "FischertechnikFactory",
    MetricData: [
      {
        MetricName: "OrdersProcessed",
        Dimensions: [{ Name: "Color", Value: color }],
        Unit: "Count",
        Value: 1
      }
    ]
  });

  await cloudwatch.send(metricCommand);

}


// 2. Handle Raw Material Orders
async function handleRawMaterialOrder(event) {
    const { color, quantity } = event;

    console.log(`RawMaterialOrder - color: ${color}, quantity: ${quantity}`);

    const metricCommand = new PutMetricDataCommand({
      Namespace: "FischertechnikFactory",
      MetricData: [
        {
          MetricName: "RawMaterialsOrdered",
          Dimensions: [{ Name: "Color", Value: color }],
          Unit: "Count",
          Value: quantity
        }
      ]
    });

    await cloudwatch.send(metricCommand);
}



// 3. Handle Factory Status Updates
async function handleFactoryStatus(event) {
  const { active_stations = [], piece_locations = {} } = event;

  console.log(`Active Stations: ${active_stations.join(", ")}`);
  for (const [piece, location] of Object.entries(piece_locations)) {
    console.log(`Piece '${piece}' is currently at '${location}'.`);
  }
}

// 4. Handle High-Bay Warehouse Stock Updates
async function handleStock(event) {
  const { layout = {} } = event;

  console.log(`High-Bay Warehouse Layout:`);

  let filledSlots = 0;

  const slots = Object.entries(layout).sort();
  for (const [slot, content] of slots) {
    const display = content || "empty";
    console.log(`Slot ${slot.toUpperCase()}: ${display}`);
    if (content && content !== "") {
      filledSlots++;
    }
  }

  const metricCommand = new PutMetricDataCommand({
    Namespace: "FischertechnikFactory",
    MetricData: [
      {
        MetricName: "StockSlotsFilled",
        Unit: "Count",
        Value: filledSlots
      }
    ]
  });

  await cloudwatch.send(metricCommand);
}

// 5. Handle NFC Reader Activity
async function handleNfcReader(event) {
  const { timestamp, piece_id, state } = event;

  console.log(`NFC Read @ ${timestamp}: Piece '${piece_id}' is '${state}'.`);
}
