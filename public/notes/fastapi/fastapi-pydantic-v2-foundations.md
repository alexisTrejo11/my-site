# Pydantic V2 Foundations

Pydantic is FastAPI's validation engine. It uses Python type hints to parse, validate, and serialize data — most validation runs in Rust-core code (via `pydantic-core`), which is why it's so fast.

## BaseModel Basics

```python
from pydantic import BaseModel, Field
from datetime import datetime

class User(BaseModel):
    id: int
    username: str = Field(..., min_length=3, max_length=20)
    email: str
    created_at: datetime | None = None
    is_active: bool = True

# Parse dict → validated model
user = User.model_validate({"id": 1, "username": "alex", "email": "a@b.com"})

# Serialize model → dict/JSON
user.model_dump()
user.model_dump_json()
```

## Type Hinting Powers

```python
from typing import Literal

class Order(BaseModel):
    status: Literal["pending", "paid", "shipped"]
    items: list[str]
    metadata: dict[str, str] = {}
    quantity: int = Field(gt=0)
```

Invalid data raises `ValidationError` with structured errors — FastAPI turns these into HTTP 422 responses automatically.

## Strict vs Lax Mode

```python
class StrictUser(BaseModel):
    model_config = {"strict": True}

    id: int
    name: str

# "42" won't coerce to int in strict mode
```

## Model Config (V2)

```python
from pydantic import ConfigDict

class User(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1,
        validate_assignment=True,  # Validate on attribute set
        from_attributes=True,      # Read ORM objects (was orm_mode)
    )

    id: int
    name: str
```

`from_attributes=True` lets Pydantic read SQLAlchemy/SQLModel objects:

```python
db_user = session.get(User, 1)
schema = UserResponse.model_validate(db_user)
```

## Optional & Defaults

```python
class ProfileUpdate(BaseModel):
    bio: str | None = None          # Optional, can be null
    website: str = "https://..."    # Default if omitted
    tags: list[str] = Field(default_factory=list)  # Never use mutable default!
```

## Nested Models

```python
class Address(BaseModel):
    street: str
    city: str

class Customer(BaseModel):
    name: str
    address: Address
    previous_addresses: list[Address] = []
```

## FastAPI Integration

```python
@app.post("/users/")
async def create_user(user: UserCreate) -> UserResponse:
    # `user` is already validated when the function runs
    ...
```

OpenAPI schema is generated from your Pydantic models automatically.

## Combat Tips

### ✅ DO
- Use precise types (`EmailStr`, `HttpUrl`, `UUID`) from `pydantic`
- Use `Field()` for constraints and documentation
- Keep models small and focused (one model per use case)

### ❌ DON'T
- Don't use `dict` when a BaseModel communicates intent better
- Don't skip validation on "internal" endpoints — bugs travel
- Don't confuse Pydantic models with SQLAlchemy models — separate layers

## Related Notes
- [Data Shaping Schemas](/learning/fastapi-data-shaping-schemas) - Input vs output models
- [Custom Validators](/learning/fastapi-custom-validators) - Custom validation logic
- [Declaring Endpoints](/learning/fastapi-declaring-endpoints) - Using models in routes
