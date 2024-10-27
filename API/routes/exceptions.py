from fastapi import HTTPException, status


def unauthorized_exception(message: str = "You don't have permission to do this") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=message,
        headers={"WWW-Authenticate": "Bearer"}
    )


def bad_request_exception(message: str = "Bad request") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=message
    )
