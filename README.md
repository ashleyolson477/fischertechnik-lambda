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
| Date | Task Completed | Notes |
|-----|----------------|------|
| (Add entries here) | | |

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

