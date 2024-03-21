import requests
from starlette import status
import random
from .conftest import ACCESS_POINT


EXERCISE_SORTEDBY_TYPE_ENDPOINT = ACCESS_POINT + \
    '/exercise/sorted/exercise_type'
EXERCISE_SORTEDBY_GOAL_TYPE_ENDPOINT = ACCESS_POINT + \
    '/exercise/sorted/exercise_goal_type'
EXERCISE_BY_ID_ENDPOINT = ACCESS_POINT + \
    '/exercise/{exercise_id}'
EXERCISE_ALL_TYPES_ENDPOINT = ACCESS_POINT + \
    '/exercise/exercise_types/'
EXERCISE_ALL_UNITS_ENDPOINT = ACCESS_POINT +\
    '/exercise/exercise_units/'


def test_exercise_type():
    response = requests.get(EXERCISE_SORTEDBY_TYPE_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


def test_exercise_goal_type():
    response = requests.get(EXERCISE_SORTEDBY_GOAL_TYPE_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


def test_exercise_by_id():
    random_int = random.randint(1, 20+1)
    response = requests.get(
        EXERCISE_BY_ID_ENDPOINT.format(exercise_id=random_int))
    assert response.status_code == status.HTTP_200_OK


def test_exercise_all_types():
    response = requests.get(EXERCISE_ALL_TYPES_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


def test_exercise_all_units():
    response = requests.get(EXERCISE_ALL_UNITS_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK
