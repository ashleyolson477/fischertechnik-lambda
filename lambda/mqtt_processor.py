from lambda.factory_logic import (
    handle_dashboard_order,
    handle_factory_status,
    handle_nfc_event,
    handle_stock_update,
)

def process_mqtt_message(event):
    topic = event.get("topic")
    payload = event.get("payload")

    if topic == "dashboard/order":
        return handle_dashboard_order(payload)
    elif topic == "factory/status":
        return handle_factory_status(payload)
    elif topic == "nfc/reader":
        return handle_nfc_event(payload)
    elif topic == "warehouse/stock":
        return handle_stock_update(payload)
    else:
        return {"message": "Unknown topic", "status": 400}
