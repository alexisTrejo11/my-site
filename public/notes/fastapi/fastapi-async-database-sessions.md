# Async Database Sessions

Session management is the backbone of database access in FastAPI. Pair **async engines** with **`Depends` + `yield`** for automatic open/close per request.

## The Canonical Pattern

```python
# database/session.py
from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

engine = create_async_engine(
    "postgresql+asyncpg://user:pass@localhost/db",
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

```python
@app.get("/users/{user_id}")
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db_session),
):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

## Read-Only Endpoints (Optional)

For read-heavy APIs, commit on write only:

```python
async def get_db_readonly() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
        # No commit — read-only

async def get_db_write() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

## Query Patterns (SQLAlchemy 2.0)

```python
from sqlalchemy import select

# One row
user = await db.scalar(select(User).where(User.id == user_id))

# Many rows
result = await db.scalars(select(User).where(User.is_active == True))
users = result.all()

# Insert
db.add(User(username="alex", email="a@b.com"))
await db.flush()  # Get ID without full commit if in transaction
```

## Lifespan Events (App Startup/Shutdown)

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: warm pool, run checks
    yield
    # Shutdown: dispose engine
    await engine.dispose()

app = FastAPI(lifespan=lifespan)
```

## Connection Pool Tuning

| Setting | Meaning |
|---------|---------|
| `pool_size` | Persistent connections |
| `max_overflow` | Extra connections under load |
| `pool_pre_ping` | Test connection before use (avoids stale) |
| `pool_recycle` | Recycle connections after N seconds |

## Combat Tips

### ✅ DO
- One session per request via `Depends`
- Use `asyncpg` or `aiosqlite` drivers
- Call `await engine.dispose()` on shutdown

### ❌ DON'T
- Don't share sessions across requests
- Don't forget `await` on async DB calls
- Don't hold sessions open across background tasks — pass IDs, open new session in task

## Related Notes
- [The Dependency Injection](/learning/fastapi-the-dependency-injection) - How `Depends` works
- [Decoupling The ORM](/learning/fastapi-decoupling-the-orm) - Project structure
- [Async Await Deep Dive](/learning/fastapi-async-await-deep-dive) - Async discipline
