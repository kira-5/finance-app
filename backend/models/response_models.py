import datetime
from typing import Any, Optional

from fastapi import status as http_status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class BaseResponseBody(BaseModel):
    message: str = ""
    status: int = http_status.HTTP_200_OK
    success: bool = True
    user_id: Optional[int] = None
    data: Optional[Any] = None
    error: Optional[Any] = None


class BaseJSONResponse(JSONResponse):
    def __init__(
        self,
        status_code: int = http_status.HTTP_200_OK,
        message: str = "",
        success: bool = True,
        user_id: Optional[int] = None,
        data: Optional[Any] = None,
        error: Optional[Any] = None,
        headers: Optional[dict[str, str]] = None,
        media_type: Optional[str] = None,
        background: Optional[Any] = None,
    ) -> None:
        content = BaseResponseBody(
            message=message,
            status=status_code,
            success=success,
            user_id=user_id,
            data=data if data is not None else [],
            error=error,
        )
        super().__init__(
            content=jsonable_encoder(content),
            status_code=status_code,
            headers=headers,
            media_type=media_type,
            background=background,
        )
