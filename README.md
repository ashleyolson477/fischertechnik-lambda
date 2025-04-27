# Fischertechnik Factory Cloud Integration

## Table of Contents
- [Introduction](#introduction)
- [System Architecture Overview](#system-architecture-overview)
- [Factory Metrics and Variables](#factory-metrics-and-variables)
- [MQTT Communication Setup](#mqtt-communication-setup)
- [AWS Integration](#aws-integration)
- [Challenges and Troubleshooting Log](#challenges-and-troubleshooting-log)
- [Progress Documentation](#progress-documentation)
- [Future Work and Next Steps](#future-work-and-next-steps)
- [Appendices](#appendices)

## Introduction
This project documents the integration of a Fischertechnik factory model with AWS services using MQTT communication protocols. The goal is to enable cloud-based control, monitoring, and automation of the factory's operations.

## System Architecture Overview
The system uses MQTT to transmit factory data to AWS IoT Core, triggering AWS Lambda functions and logging data in CloudWatch for monitoring and analysis.

**Architecture Diagram:**  
*(Insert diagram here once available)*

**Components:**
- **Fischertechnik Factory** — physical factory model
- **MQTT Protocol** — communication between factory and cloud
- **AWS IoT Core** — MQTT broker in the cloud
- **AWS Lambda** — serverless functions to process messages
- **AWS CloudWatch** — metrics collection and monitoring

## Factory Metrics and Variables
**Key metrics collected:**
- `dashboardOrder`
  - Status: `ordered`, `in process`, `shipped`
  - Piece color: `red`, `blue`, `white`
- `factoryStatus`
  - Active stations
  - Current piece locations
- `stock`
  - High-bay warehouse layout (grid: `a1`–`c3`)
- `nfcReader`
  - Piece ID
  - Timestamp
  - State of the piece

## MQTT Communication Setup
- **Local Testing**:
  - Set up a Mosquitto broker.
  - Tested message publishing using `mosquitto_pub`.
- **Cloud Integration**:
  - Transitioned to AWS IoT Core using device certificates.
  - Used Node-RED for MQTT message publishing.
- **Testing Methods**:
  - Inject nodes in Node-RED.
  - Verified message receipt in AWS IoT Core logs.

## AWS Integration
**AWS IoT Core**:
- Created "Things" and attached security certificates.
- Configured IoT policies for secure messaging.

**AWS Lambda**:
- Created functions to process incoming factory messages.
- Integrated with IoT Core topics.

**AWS CloudWatch**:
- Collected and visualized key factory metrics.
- Set up alarms and dashboards (in progress).

## Challenges and Troubleshooting Log
| Date | Issue | Solution/Notes |
|-----|------|----------------|
| (Add entries here) | | |

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

## Future Work and Next Steps
- Implement full automation using AWS Lambda triggers.
- Improve CloudWatch dashboards for better visualization.
- Expand system to include more sensor data and analytics.
- Explore CI/CD pipeline integration for future deployments.

## Appendices
- [ ] Architecture Diagram (to be added)
- [ ] Node-RED flow export (optional)
- [ ] Useful links:
  - [AWS IoT Core Documentation](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html)
  - [Node-RED Documentation](https://nodered.org/docs/)
  - [MQTT Protocol Specification](http://mqtt.org/)

