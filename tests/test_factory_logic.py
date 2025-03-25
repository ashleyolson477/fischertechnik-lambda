import unittest
from lambda.factory_logic import (
    handle_dashboard_order,
    handle_nfc_event,
    handle_stock_update,
    order_state, stock
)

class TestFactoryLogic(unittest.TestCase):

    def test_valid_order(self):
        response = handle_dashboard_order({"color": "red", "status": "ordered"})
        self.assertEqual(response["order"]["color"], "red")

    def test_invalid_color(self):
        response = handle_dashboard_order({"color": "green", "status": "ordered"})
        self.assertIn("error", response)

    def test_nfc_log_entry(self):
        result = handle_nfc_event({"pieceID": "abc123", "state": "picked"})
        self.assertEqual(result["entry"]["pieceID"], "abc123")

    def test_valid_stock_update(self):
        result = handle_stock_update({"location": "a1", "piece": "blue"})
        self.assertEqual(stock["a1"], "blue")

    def test_invalid_stock_location(self):
        result = handle_stock_update({"location": "z9", "piece": "blue"})
        self.assertIn("error", result)
