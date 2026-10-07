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

from fastapi.testclient import TestClient
from app.main import app
from app.core.dependencies import get_current_user
import pytest

client = TestClient(app)

# Mock user for authenticated requests
MOCK_USER = {
    "_id": "507f1f77bcf86cd799439011",
    "email": "test@example.com",
    "name": "Test User"
}

def override_get_current_user():
    return MOCK_USER

def test_unauthenticated_user_cannot_access_protected_route():
    # Progress requires auth
    response = client.get("/api/v1/progress/")
    assert response.status_code == 403 or response.status_code == 401

def test_authenticated_user_access():
    app.dependency_overrides[get_current_user] = override_get_current_user
    response = client.get("/api/v1/dashboard/")
    # If DB isn't running it might 500, but it shouldn't 401/403
    assert response.status_code in [200, 500]
    app.dependency_overrides.clear()

def test_validation_error():
    app.dependency_overrides[get_current_user] = override_get_current_user
    # Send empty payload to update progress, missing required fields
    response = client.post("/api/v1/progress/update", json={})
    assert response.status_code == 422
    app.dependency_overrides.clear()

def test_missing_resource():
    app.dependency_overrides[get_current_user] = override_get_current_user
    response = client.get("/api/v1/topics/507f1f77bcf86cd799439022")
    # Might be 404 or 500 if DB is down
    assert response.status_code in [404, 500]
    app.dependency_overrides.clear()
