# Fischertechnik Factory Cloud Integration

## Table of Contents
- [Introduction](#introduction)
- [System Architecture Overview](#system-architecture-overview)
- [Factory Metrics and Variables](#factory-metrics-and-variables)
- [Node-RED Flows and Cloud Messaging](#node-red-flows-and-cloud-messaging)
- [MQTT Communication Setup](#mqtt-communication-setup)
- [AWS Integration (Testing Only)](#aws-integration-testing-only)
- [Challenges and Troubleshooting Log](#challenges-and-troubleshooting-log)
- [Progress Documentation](#progress-documentation)
- [Future Work and Next Steps](#future-work-and-next-steps)
- [Appendices](#appendices)

## Introduction
This project documents the integration of a Fischertechnik factory model with AWS services using MQTT communication protocols. The goal is to enable cloud-based control, monitoring, and automation of the factory's operations using Node-RED as the bridge.

## System Architecture Overview
The system uses MQTT to transmit factory data to and from the cloud. Node-RED is the central integration point for managing messaging between AWS IoT Core and the local factory system.

## System Architecture (Temporary Diagram)

![Temporary Architecture Diagram](architecture.png)

> **Note:** This is a temporary diagram representing the current architecture. Final version pending full system completion.

### Architecture Description
- **Factory:**  
  - Executes physical actions and publishes live data such as order status, NFC scans, and stock levels.
- **Node-RED:**  
  - Acts as the local MQTT orchestrator, sending and receiving MQTT messages between AWS and the factory.
- **MQTT Protocol:**  
  - Lightweight communication protocol used for device-to-cloud and cloud-to-device messaging.
- **AWS IoT Core:**  
  - Receives MQTT messages and was used for testing cloud connectivity and message formatting.
- **AWS Lambda & CloudWatch:**  
  - Used for simulation and debugging only. Not integrated with live factory data.

## Factory Metrics and Variables

This section describes the key data points used in the live Node-RED-to-factory implementation.

### 🔧 MQTT-Based Metrics (Used in Node-RED)

| Metric / Variable     | Description |
|------------------------|-------------|
| `order.type`           | The color of the piece being ordered (`RED`, `BLUE`, `WHITE`). Sent from cloud to factory via `f/o/order`. |
| `order.ts`             | ISO-formatted UTC timestamp when the order was sent (e.g., `"2025-04-29T18:32:10Z"`). |
| `nfcReader`            | Reports detection of piece IDs and states. Each message includes `workpiece.id`, `ts`, and a status like `PLACED` or `REMOVED`. |
| `workpiece.location`   | Factory sends warehouse item positions (e.g., `a1`, `b3`) for cloud tracking after matching with scanned NFC tag. |

### MQTT Topics in Use (Live in Node-RED)

| Topic                   | Direction | Description |
|-------------------------|-----------|-------------|
| `factory/control`       | Inbound   | Orders sent from AWS to Node-RED (`{ "type": "RED" }`). |
| `f/o/order`             | Outbound  | Formatted order message (type + timestamp) sent to factory. |
| `fl/i/nfc/ds`           | Inbound   | NFC scan result including UID and type from factory. |
| `f/i/stock`             | Inbound   | Full stock list including item IDs and locations. Used to match NFC UIDs. |
| `factory/warehouse/state` | Outbound | Final cloud-published message containing matched `type`, `location`, and `timestamp`. |

---

## Node-RED Flows and Cloud Messaging

### Flow 1: **AWS-to-Factory Order Flow**  
**Flow Name:** `Ashley_MQTT Factory Control`  
**Purpose:** Allows AWS to trigger factory orders based on color selection.

#### Components:
- **`mqtt in (factory/control)`**: Listens to AWS for an order message (`{ type: "RED" }`).
- **`function (Parse AWS Stock Order)`**: Formats color and adds a timestamp.
- **`switch (Which Color to Order?)`**: Branches logic based on `RED`, `BLUE`, or `WHITE`.
- **`function (Log RED/BLUE/WHITE Order)`**: Logs outgoing order in debug sidebar.
- **`mqtt out (f/o/order)`**: Sends message to the local broker to control the factory.

---

### Flow 2: **Factory-to-AWS Warehouse Flow**  
**Flow Name:** `Ashley_MQTT Cloud Recieve`  
**Purpose:** Correlates NFC scan data with current warehouse stock to track workpiece locations.

#### Components:
- **`mqtt in (fl/i/nfc/ds)`**: Receives the latest scanned UID from the NFC reader.
- **`function (Store Last Scanned UID)`**: Stores UID temporarily for comparison.
- **`mqtt in (f/i/stock)`**: Receives current stock layout from the factory.
- **`function (Match UID and Publish)`**: Matches scanned UID to warehouse item and formats a payload `{ type, location, ts }`.
- **`mqtt out (factory/warehouse/state)`**: Publishes matched result to AWS IoT Core.
- **`debug`**: Displays final cloud message in the debug sidebar.

---

## MQTT Communication Setup

- **Local Testing**:
  - Used a Mosquitto broker to verify basic message sending.
- **AWS IoT Core Integration**:
  - Configured MQTT broker credentials and TLS certificates.
  - Connected AWS topics to Node-RED using secure MQTT input/output nodes.

---

## AWS Integration (Testing Only)

**AWS IoT Core**:
- Created AWS “Things” with security certificates.
- Used only to verify MQTT connectivity between AWS and Node-RED.

**AWS Lambda**:
- Used for early testing to simulate how factory messages might be processed.
- Not connected to the live factory system.

**AWS CloudWatch**:
- Temporarily used to simulate metric logging and visualize test payloads.
- Not integrated into the live data pipeline.

---

## Challenges and Troubleshooting Log
| Date | Issue | Solution/Notes |
|-----|------|----------------|
| (Add entries here) | | |

---

## Progress Documentation
| Date | Progress Made | Challenges Faced | Next Steps |
|-----|----------------|----------------|---------|
| 2/3 | Started the factory and successfully logged in using GitHub credentials. Connected using a personal hotspot. Confirmed the camera was fully functional and connected to the laptop. | Did not know how to properly use or SSH into the factory. Buttons on web interface unresponsive. Factory displayed "project running was stopped" error. | Ask for help connecting to cloud. Request a factory walkthrough. Ask about proper shutdown procedures. |
| 2/13 | Met with Bobby to learn factory commands. Discussed cloud integration possibilities. Completed a 1-hour Node.js tutorial. | Persistent networking issues even after switching Wi-Fi. | Contact Bryle about error logs. Contact Justin about cloud code. Finish Node.js tutorial and start AWS API Gateway tutorial. |
| 2/17 | Discussed current factory issues. | See Progress Made. | Learn MQTT protocol. Attempt Node-RED connection. Investigate Node-RED to factory communication. Review Discord/GitHub resources. |
| 2/19 | Node-RED successfully connected with live updates and no errors. | Camera continually moving left unnecessarily. | Focus on MQTT communication setup. |
| 2/19 (Research) | Researched MQTT GitHub repo. Learned Node-RED and Mosquitto basics. | Cannot proceed with MQTT until AWS server is set up. Hosting payment concerns. | Confirm AWS free tier with Dony. Finish Node.js tutorial. Begin AWS EC2 setup. |
| 2/25 | Confirmed AWS free tier eligibility. Finished Node.js tutorial. Completed AWS account setup. | Needed to input credit card for AWS signup. | Review EC2 needs. Proceed with EC2 setup if needed. |
| 3/3 | Project check-in. | None. | Continue project tasks. |
| 3/4 | AWS root/user accounts created. EC2 server up and running. | Billing confusion. Realized Lambda needed instead of EC2. | Set up AWS IoT Core and Lambda. |
| 3/5 | AWS Lambda setup complete. Started AWS IoT Core and MQTT bridge setup. | Ran out of time to SSH into TXT controller. | SSH into controller. Transfer certificates. Finalize MQTT broker setup. Integrate IoT Core with Lambda. |
| 3/11 | Attempted AWS IoT Core connection using certificates. | Lack of root access to factory device. | Obtain root username/password. Prepare USB backup. |
| 3/18 | Focused on alternative methods to move forward without full credentials. | Still awaiting factory credentials. | Simulate IoT Core in Lambda. Continue Lambda work until lab access. |
| 3/24 | Built Lambda functions without factory connection. Researched MQTT broker setups. Investigated Grafana for visualization. | Limited by lack of factory access. Confusion around AWS Lambda billing. | Review Lambda billing. Continue Lambda preparation. |
| 3/25 | Set up Lambda and CloudWatch monitoring (OrdersProcessed, RawMaterialsOrdered). Built a basic CI/CD pipeline for testing. | Difficulty filtering CloudWatch metrics. Uploading files to Lambda required troubleshooting. | Set up CloudWatch metrics for NFC reader. Sync AWS setup with GitHub. |
| 3/27 | SSH connection to factory established. Certificates manually transferred. Custom MQTT bridge config created. Node-RED selected as MQTT publisher. | SCP failed due to PowerShell quoting issues. No sudo access. Could not run Mosquitto manually. | Fully integrate Node-RED MQTT bridge. |
| 4/7 | Factory connected to AWS IoT Core via Node-RED. Test MQTT messages confirmed in AWS. | Troubles configuring certificates and policies correctly. | Publish messages from all factory systems. Integrate data into CloudWatch and Lambda. |
| 4/9 | Node-RED test flow reconnected. Lambda processed messages. CloudWatch metrics (OrdersProcessed, RawMaterialsOrdered, StockSlotsFilled) added. | Lambda initially lacked CloudWatch metric publishing permissions. | Add PTU movement and station activity metrics. Improve dashboard visualization. Plan automation. |
| 4/14 | Reviewed progress with factory data input. Discussed automation and dashboard improvements. | Uncertainty starting the factory manual. | Start writing manual. Choose manual creation tool (Markdown, Google Docs, etc.). |
| 4/23 | Focused on NFC reader integration, cloud-to-factory messaging, and manual creation. | See Progress Made. | Contact Fabian. Complete system manual. |
| 4/24 | Collaborated with Fabian. Fixed Node-RED IP address issue causing cloud-to-cloud messaging loop. | See Progress Made. | Ensure Node-RED connects properly to the factory. Continue manual development. |

---

## Future Work and Next Steps
- Add automation logic for warehouse control using Node-RED.
- Consider secure logging or external dashboard (e.g., Grafana) if time allows.
- Fully document current JSON message formats and flows.

---

## Appendices
- [ ] Architecture Diagram
- [ ] Node-RED flow export [here](flows/temp_flow.json)
- [ ] Useful links:
  - [AWS IoT Core Documentation](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html)
  - [Node-RED Documentation](https://nodered.org/docs/)
  - [MQTT Protocol Specification](http://mqtt.org/)
