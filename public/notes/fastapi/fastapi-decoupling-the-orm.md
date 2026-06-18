# Decoupling the ORM

FastAPI has no built-in ORM. You choose **SQLAlchemy 2.0** (maximum control) or **SQLModel** (SQLAlchemy + Pydantic, by the FastAPI author). The key is **layer separation**.

## Recommended Project Layers

```text
app/
├── main.py              # FastAPI app, router includes
├── routers/             # HTTP layer only
├── schemas/             # Pydantic in/out models
├── models/              # SQLAlchemy / SQLModel tables
├── services/            # Business logic
├── dependencies/        # get_db, get_current_user
└── database/            # engine, session factory
```

```mermaid
flowchart TB
    Router --> Schema[Pydantic Schemas]
    Router --> Service[Service Layer]
    Service --> ORM[ORM Models]
    ORM --> DB[(PostgreSQL)]
```

Routers should not contain raw SQL or complex business rules.

## SQLAlchemy 2.0 Setup

```python
# database/engine.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/mydb"

engine = create_async_engine(DATABASE_URL, echo=False, pool_pre_ping=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)
```

```python
# models/user.py
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str]
```

## SQLModel Alternative

```python
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str
    password_hash: str
```

SQLModel doubles as Pydantic-like schema — still prefer separate `UserCreate` / `UserResponse` for APIs.

## Service Layer Example

```python
# services/user_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

async def create_user(db: AsyncSession, data: UserCreate) -> User:
    existing = await db.scalar(select(User).where(User.email == data.email))
    if existing:
        raise ValueError("Email already registered")
    user = User(
        username=data.username,
        email=data.email,
        password_hash=hash_password(data.password),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
```

```python
# routers/users.py
@router.post("/", response_model=UserResponse, status_code=201)
async def create_user_endpoint(
    data: UserCreate,
    db: AsyncSession = Depends(get_db_session),
):
    try:
        user = await create_user(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return user
```

## Sync ORM with FastAPI?

Possible via `def` endpoints (thread pool) — but for new projects, prefer **async all the way**:

```python
# Async driver required
postgresql+asyncpg://...
```

## Combat Tips

### ✅ DO
- Keep ORM models in `models/`, Pydantic in `schemas/`
- Use repositories or services for complex queries
- Configure connection pooling on the engine

### ❌ DON'T
- Don't import FastAPI into models or services
- Don't return ORM models without `response_model`
- Don't mix sync drivers in `async def` endpoints

## Related Notes
- [Async Database Sessions](/learning/fastapi-async-database-sessions) - Session lifecycle
- [Migrations with Alembic](/learning/fastapi-migrations-with-alembic) - Schema migrations
- [Data Shaping Schemas](/learning/fastapi-data-shaping-schemas) - API vs DB models
