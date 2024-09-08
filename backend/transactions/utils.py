from models import response_models as common_models


def create_response(message, status, user_id, data):
    return common_models.BaseResponseBody(
        message=message, status=status, user_id=user_id, data=data
    )
