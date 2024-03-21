import requests
from starlette import status
from .conftest import ACCESS_POINT

# import pytest
from .conftest import token


CREATE_SCHEDULE_ENDPOINT = ACCESS_POINT + "/schedule/create_schedule/"
GET_PERSONAL_SCHEDULES_ENDPOINT = ACCESS_POINT + "/schedule/user_schedules/"
EDIT_OR_DELETE_PERSONAL_SCHEDULES_ENDPOINT = (
    ACCESS_POINT + "/schedule/user_schedules/{}"
)


# @pytest.mark.skip("in case schedule is registered")
def test_create_schedule(access_token):
    response = requests.post(
        CREATE_SCHEDULE_ENDPOINT,
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "range_min": 10,
            "range_max": 20,
            "selected_exercises": [20, 2, 3, 9],
            "note": "some note",
            "extended note": "some extended note",
        },
    )
    if response.status_code != 200:
        print(response.content)
    assert response.status_code == status.HTTP_200_OK


class TestscheduleRoutes:
    @classmethod
    def setup_method(self):  # get all schedules
        t = token()
        self.access_token = t
        response = requests.get(
            GET_PERSONAL_SCHEDULES_ENDPOINT,
            headers={"Authorization": f"Bearer {self.access_token}"},
        )
        if response.status_code != 200:
            print(response.content)
        assert (
            response.status_code == status.HTTP_200_OK
        ), f"Expected 200, got {response.status_code}"
        schedules = response.json()["schedules"]
        last_schedule = schedules[-1]
        self.schedule_id = last_schedule["schedule_id"]

    def test_edit_personal_schedule(self):
        response = requests.put(
            EDIT_OR_DELETE_PERSONAL_SCHEDULES_ENDPOINT.format(
                self.schedule_id),
            headers={"Authorization": f"Bearer {self.access_token}"},
            json={
                "range_min": 10,
                "range_max": 20,
                "selected_exercises": [20, 2, 3, 9],
            },
        )
        if response.status_code != 200:
            print(response.content)
        assert (
            response.status_code == status.HTTP_200_OK
        ), f"Expected 200, got {response.status_code}"

    def teardown_method(self):  # delete schedule
        response = requests.delete(
            EDIT_OR_DELETE_PERSONAL_SCHEDULES_ENDPOINT.format(
                self.schedule_id),
            headers={"Authorization": f"Bearer {self.access_token}"},
        )
        if response.status_code != 200:
            print(response.content)
        assert (
            response.status_code == status.HTTP_200_OK
        ), f"Expected 200, got {response.status_code}"
