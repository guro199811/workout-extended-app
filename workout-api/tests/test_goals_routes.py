import requests
from starlette import status
from .conftest import ACCESS_POINT
# import pytest
from .conftest import token


ALL_GOAL_TYPES_ENDPOINT = ACCESS_POINT + '/goal/all_goal_types/'
CREATE_GOAL_ENDPOINT = ACCESS_POINT + '/goal/create_goal/'
GET_PERSONAL_GOALS_ENDPOINT = ACCESS_POINT + '/goal/personal_goals/'
EDIT_OR_DELETE_PERSONAL_GOALS_ENDPOINT = \
    ACCESS_POINT + '/goal/personal_goals/{}'


def test_all_goal_types():
    response = requests.get(ALL_GOAL_TYPES_ENDPOINT)
    if response.status_code != 200:
        print(response.content)
    assert response.status_code == status.HTTP_200_OK, \
        f"Expected 200, got {response.status_code}"


# @pytest.mark.skip("in case goal is registered")
def test_create_goal(access_token):
    response = requests.post(
        CREATE_GOAL_ENDPOINT,
        headers={
            "Authorization": f"Bearer {access_token}"
        },
        json={
            "goal_name": "test_name",
            "range_min": 10,
            "range_max": 20,
            "selected_exercises": [
                20, 2, 3, 9
            ],
            "goal_type_id": 1
        }
    )
    if response.status_code != 200:
        print(response.content)
    assert response.status_code == status.HTTP_200_OK


class TestGoalRoutes:
    @classmethod
    def setup_method(self):  # get all goals
        t = token()
        self.access_token = t
        response = requests.get(
            GET_PERSONAL_GOALS_ENDPOINT,
            headers={
                "Authorization": f"Bearer {self.access_token}"
            }
        )
        if response.status_code != 200:
            print(response.content)
        assert response.status_code == status.HTTP_200_OK, \
            f"Expected 200, got {response.status_code}"
        goals = response.json()['user_goals']
        last_goal = goals[-1]
        self.goal_id = last_goal['goal_id']

    def test_edit_personal_goal(self):
        response = requests.put(
            EDIT_OR_DELETE_PERSONAL_GOALS_ENDPOINT.format(self.goal_id),
            headers={
                "Authorization": f"Bearer {self.access_token}"
            },
            json={
                "goal_name": "test_name_edited",
                "range_min": 10,
                "range_max": 20,
                "selected_exercises": [
                    20, 2, 3, 9
                ],
                "goal_type_id": 1
            }
        )
        if response.status_code != 200:
            print(response.content)
        assert response.status_code == status.HTTP_200_OK, \
            f"Expected 200, got {response.status_code}"

    def teardown_method(self):  # delete goal
        response = requests.delete(
            EDIT_OR_DELETE_PERSONAL_GOALS_ENDPOINT.format(self.goal_id),
            headers={
                "Authorization": f"Bearer {self.access_token}"
            }
        )
        if response.status_code != 200:
            print(response.content)
        assert response.status_code == status.HTTP_200_OK, \
            f"Expected 200, got {response.status_code}"
