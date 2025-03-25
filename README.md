# Fischertechnik Lambda Controller

Lambda function to handle MQTT messages from a Fischertechnik factory setup.

## Features
- Order tracking (`dashboardOrder`)
- Factory status updates
- NFC event logging
- High-bay warehouse stock tracking

## Testing
```bash
python -m unittest discover
```

## Deployment
Set up GitHub Actions or zip & upload to AWS manually.
