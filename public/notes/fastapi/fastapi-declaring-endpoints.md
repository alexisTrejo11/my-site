# Declaring Endpoints

FastAPI maps URL paths and HTTP methods to Python functions. Type hints drive validation, serialization, and automatic OpenAPI docs.

## Basic Routes

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):  # Auto-validated as integer
    return {"item_id": item_id}
```

## Path Parameters

```python
from enum import Enum

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    return {"model": model_name}
```

## Query Parameters

```python
from typing import Annotated
from fastapi import Query

@app.get("/items/")
async def list_items(
    skip: int = 0,
    limit: int = Query(default=10, le=100),
    q: str | None = None,
):
    return {"skip": skip, "limit": limit, "q": q}
```

### Readability tip
Group related query params in a Pydantic model for complex endpoints:

```python
class PaginationParams(BaseModel):
    skip: int = 0
    limit: int = Query(default=20, le=100)

@app.get("/users/")
async def list_users(pagination: Annotated[PaginationParams, Query()]):
    ...
```

## Request Body

```python
from pydantic import BaseModel

class ItemCreate(BaseModel):
    name: str
    price: float
    tags: list[str] = []

@app.post("/items/")
async def create_item(item: ItemCreate):
    return item
```

## Multiple Parameter Types

```python
@app.put("/items/{item_id}")
async def update_item(
    item_id: int,           # Path
    item: ItemCreate,       # Body
    q: str | None = None,   # Query
):
    return {"item_id": item_id, "item": item, "q": q}
```

## Response Control

```python
from fastapi import status
from fastapi.responses import JSONResponse

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    return item

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    return None
```

## Router Modules (Project Structure)

```python
# routers/items.py
from fastapi import APIRouter

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/")
async def list_items():
    ...

# main.py
from routers import items
app.include_router(items.router)
```

```text
app/
├── main.py
├── routers/
│   ├── items.py
│   └── users.py
├── schemas/
├── models/
└── dependencies/
```

## HTTP Methods Map

| Decorator | Use |
|-----------|-----|
| `@app.get` | Read |
| `@app.post` | Create |
| `@app.put` | Full replace |
| `@app.patch` | Partial update |
| `@app.delete` | Remove |

## Combat Tips

### ✅ DO
- Use `tags=` on routers for clean Swagger grouping
- Version APIs with prefix: `app.include_router(v1_router, prefix="/api/v1")`
- Name path params clearly: `{user_id}` not `{id}`

### ❌ DON'T
- Don't use mutable defaults (`tags: list = []`) — use `Field(default_factory=list)`
- Don't put business logic in route decorators — keep handlers thin
- Don't skip `response_model` on endpoints returning user data — see [Data Shaping Schemas](/learning/fastapi-data-shaping-schemas)

## Related Notes
- [Pydantic V2 Foundations](/learning/fastapi-pydantic-v2-foundations) - Body models
- [The Dependency Injection](/learning/fastapi-the-dependency-injection) - Shared dependencies
- [Global Error Handling](/learning/fastapi-global-error-handling) - Error responses
