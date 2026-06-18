# Global Error Handling

Clean APIs return **consistent error shapes**. FastAPI's exception handlers let you centralize HTTP errors, validation failures, and domain exceptions.

## Default Behavior

| Situation | Status | Shape |
|-----------|--------|-------|
| Pydantic validation | 422 | `{"detail": [...]}` |
| `HTTPException` | Custom | `{"detail": "message"}` |
| Unhandled exception | 500 | Internal error (hidden in prod) |

## `HTTPException` (Ad Hoc)

```python
from fastapi import HTTPException, status

@app.get("/items/{item_id}")
async def get_item(item_id: int, db: AsyncSession = Depends(get_db_session)):
    item = await db.get(Item, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item {item_id} not found",
        )
    return item
```

## Custom Exception Classes

```python
# exceptions.py
class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400, code: str = "APP_ERROR"):
        self.message = message
        self.status_code = status_code
        self.code = code

class NotFoundError(AppException):
    def __init__(self, resource: str, id: int):
        super().__init__(
            message=f"{resource} {id} not found",
            status_code=404,
            code="NOT_FOUND",
        )
```

## Global Exception Handlers

```python
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
            }
        },
    )

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Log exc with traceback in production
    return JSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_ERROR", "message": "Something went wrong"}},
    )
```

## Consistent Error Schema

```python
class ErrorResponse(BaseModel):
    code: str
    message: str
    details: dict | None = None

# All handlers return this shape — clients love predictability
```

## Custom Validation Error Handler

```python
from fastapi.exceptions import RequestValidationError

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = [
        {"field": ".".join(str(loc) for loc in e["loc"]), "message": e["msg"]}
        for e in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={"error": {"code": "VALIDATION_ERROR", "message": "Invalid input", "details": errors}},
    )
```

## Domain Errors in Services

```python
# services/item_service.py
async def get_item_or_404(db: AsyncSession, item_id: int) -> Item:
    item = await db.get(Item, item_id)
    if not item:
        raise NotFoundError("Item", item_id)
    return item

# router stays thin
@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int, db: AsyncSession = Depends(get_db_session)):
    return await get_item_or_404(db, item_id)
```

## Starlette Middleware for Logging

```python
import time
from starlette.middleware.base import BaseHTTPMiddleware

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start = time.perf_counter()
        try:
            response = await call_next(request)
            return response
        finally:
            duration = time.perf_counter() - start
            # log request.method, request.url.path, duration, response.status_code
```

## Combat Tips

### ✅ DO
- Define one error JSON contract for the whole API
- Map domain exceptions in handlers — not in every route
- Log 500s with stack traces server-side; never leak internals to clients

### ❌ DON'T
- Don't catch all exceptions and return 200 with `{"error": true}`
- Don't expose SQL errors or file paths in responses
- Don't use bare `except:` in handlers without logging

## Related Notes
- [Custom Validators](/learning/fastapi-custom-validators) - Validation that triggers 422
- [Declaring Endpoints](/learning/fastapi-declaring-endpoints) - HTTP status codes
- [FastAPI MOC](/learning/fastapi-master-moc) - Framework overview
