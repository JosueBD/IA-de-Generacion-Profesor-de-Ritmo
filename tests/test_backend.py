import unittest
import requests

class TestBackend(unittest.TestCase):
    def setUp(self):
        self.base_url = "http://localhost:5000"

    def test_generate_rhythm(self):
        response = requests.post(f"{self.base_url}/generate-rhythm", json={
            "tempo": 120,
            "beats": 4,
            "style": "classical"
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("rhythm", data)
        self.assertIn("midi", data)

    # Este test requiere un archivo sample.wav real en data/
    def test_identify_instruments(self):
        response = requests.post(f"{self.base_url}/identify-instruments", json={
            "audio_file": "data/sample.wav"
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("instruments", data)
        self.assertIn("message", data)

if __name__ == "__main__":
    unittest.main()
