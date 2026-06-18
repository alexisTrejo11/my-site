# Custom Validators

Pydantic V2 uses `@field_validator` and `@model_validator` for custom rules and in-flight transformations.

## Field Validators

```python
from pydantic import BaseModel, field_validator

class UserCreate(BaseModel):
    username: str
    password: str
    password_confirm: str

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v: str) -> str:
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v.lower()  # Transform on the fly

    @field_validator('password')
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError('Password too short')
        if not any(c.isupper() for c in v):
            raise ValueError('Need at least one uppercase letter')
        return v
```

## Model Validators (Cross-Field)

```python
from pydantic import model_validator

class UserCreate(BaseModel):
    password: str
    password_confirm: str

    @model_validator(mode='after')
    def passwords_match(self) -> 'UserCreate':
        if self.password != self.password_confirm:
            raise ValueError('Passwords do not match')
        return self
```

| Mode | When it runs |
|------|----------------|
| `before` | On raw input dict |
| `after` | On constructed model instance |

## Validating Multiple Fields

```python
class DateRange(BaseModel):
    start_date: date
    end_date: date

    @model_validator(mode='after')
    def end_after_start(self) -> 'DateRange':
        if self.end_date < self.start_date:
            raise ValueError('end_date must be after start_date')
        return self
```

## `field_validator` with `mode='before'`

```python
class Product(BaseModel):
    price: Decimal

    @field_validator('price', mode='before')
    @classmethod
    def parse_price(cls, v):
        if isinstance(v, str):
            return Decimal(v.replace('$', '').strip())
        return v
```

## Reusable Validated Types

```python
from typing import Annotated
from pydantic import AfterValidator

def strip_and_upper(v: str) -> str:
    return v.strip().upper()

CleanStr = Annotated[str, AfterValidator(strip_and_upper)]

class Tag(BaseModel):
    name: CleanStr
```

## FastAPI + Validation Errors

Pydantic errors become:

```json
{
  "detail": [
    {
      "type": "value_error",
      "loc": ["body", "password"],
      "msg": "Password too short",
      "input": "abc"
    }
  ]
}
```

Customize with [Global Error Handling](/learning/fastapi-global-error-handling).

## Combat Tips

### ✅ DO
- Validate business rules in Pydantic when they're about **data shape**
- Keep DB uniqueness checks (email exists) in the service layer
- Return transformed values from validators (normalize email, strip strings)

### ❌ DON'T
- Don't hit the database inside validators — hard to test, blocks async
- Don't raise bare `Exception` — use `ValueError` or `PydanticCustomError`
- Don't duplicate validation in both Pydantic and ORM unless necessary

## Related Notes
- [Data Shaping Schemas](/learning/fastapi-data-shaping-schemas) - Schema separation
- [Pydantic V2 Foundations](/learning/fastapi-pydantic-v2-foundations) - Core concepts
- [Global Error Handling](/learning/fastapi-global-error-handling) - Custom 422 responses
