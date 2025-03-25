from datetime import datetime

ALLOWED_COLORS = {"red", "blue", "white"}

order_state = {
    "status": None,
    "color": None,
    "timestamp": None
}

stock = {
    "a1": None, "a2": None, "a3": None,
    "b1": None, "b2": None, "b3": None,
    "c1": None, "c2": None, "c3": None,
}

nfc_log = []

def handle_dashboard_order(payload):
    color = payload.get("color")
    status = payload.get("status")

    if color not in ALLOWED_COLORS:
        return {"error": "Invalid color"}

    order_state.update({
        "color": color,
        "status": status,
        "timestamp": datetime.utcnow().isoformat()
    })
    return {"message": "Order updated", "order": order_state}

def handle_factory_status(payload):
    return {"message": "Factory status received", "data": payload}

def handle_nfc_event(payload):
    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "pieceID": payload.get("pieceID"),
        "state": payload.get("state")
    }
    nfc_log.append(entry)
    return {"message": "NFC event logged", "entry": entry}

def handle_stock_update(payload):
    location = payload.get("location")
    piece = payload.get("piece")

    if location not in stock:
        return {"error": "Invalid location"}

    stock[location] = piece
    return {"message": "Stock updated", "stock": stock}
