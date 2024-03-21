import pytest
import requests
from starlette import status

ACCESS_POINT = 'http://0.0.0.0:8000'

USER_ACCESS_TOKEN = '/auth/token'


@pytest.fixture
def access_token():
    value = token()
    return value


def token():
    response = requests.post(
        ACCESS_POINT + USER_ACCESS_TOKEN,
        data={
            "username": "test_user",
            "password": "test_password"
        }
    )
    assert response.status_code == status.HTTP_200_OK, \
        f"Expected 200, got {response.status_code}"
    return response.json()['access_token']


