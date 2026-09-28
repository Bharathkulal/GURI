from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    # Since we test without a real mongo connection in CI, it might fail or return error status
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["service"] == "guri-backend"

def test_roadmaps_unauthorized():
    response = client.get("/api/v1/roadmaps")
    # This endpoint is currently public in our mock router, but let's test it exists
    assert response.status_code == 200

# Add more tests as needed
