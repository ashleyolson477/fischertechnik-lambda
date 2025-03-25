def lambda_handler(event, context):
    from lambda.mqtt_processor import process_mqtt_message
    return process_mqtt_message(event)
