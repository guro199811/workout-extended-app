import requests
from starlette import status
import pytest
from .conftest import ACCESS_POINT


USER_REGISTRATION_ENDPOINT = ACCESS_POINT + '/auth/register'
USER_DATA_GET = ACCESS_POINT + '/user/'
USER_DATA_PUT = ACCESS_POINT + '/user/data_change'


@pytest.mark.skip(reason='in case user is registered')
def test_user_registration():
    response = requests.post(
        USER_REGISTRATION_ENDPOINT,
        json={
            "username": "test_user",
            "password": "test_password"
        }
    )
    assert response.status_code == status.HTTP_201_CREATED, \
        f"Expected 201, got {response.status_code}"


def test_token(access_token):
    assert access_token is not None, "Token is None"


def test_user_data_get(access_token):
    response = requests.get(
        USER_DATA_GET,
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )
    if response.status_code != status.HTTP_200_OK:
        print(response.content)
    assert response.status_code == status.HTTP_200_OK, \
        f"Expected 200, got {response.status_code}"


def test_user_data_put(access_token):
    response = requests.put(
        USER_DATA_PUT,
        headers={
            "Authorization": f"Bearer {access_token}"
        },
        json={
            "fullname": 'test_fullname',
            'weight': 50,
            'height': 50
        }
    )
    if response.status_code != status.HTTP_200_OK:
        print(response.content)
    assert response.status_code == status.HTTP_200_OK, \
        f'Expected 200, got {response.status_code}'
