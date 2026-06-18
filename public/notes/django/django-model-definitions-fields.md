# Model Definitions & Fields

Django models are Python classes that map to database tables. The ORM handles SQL generation and object hydration.

## Basic Model

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    body = models.TextField()
    views = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'articles'

    def __str__(self):
        return self.title
```

## Common Field Types

| Field | Use case |
|-------|----------|
| `CharField` | Short text (requires `max_length`) |
| `TextField` | Long text |
| `IntegerField` / `PositiveIntegerField` | Numbers |
| `DecimalField` | Money (`max_digits`, `decimal_places`) |
| `BooleanField` | True/False |
| `DateField` / `DateTimeField` | Dates |
| `EmailField` / `URLField` | Validated strings |
| `FileField` / `ImageField` | Uploads |
| `JSONField` | Structured JSON (PostgreSQL, etc.) |
| `UUIDField` | Primary keys |

## Relationships

```python
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
  # Many-to-one
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')

class Tag(models.Model):
    name = models.CharField(max_length=50)

class BookTag(models.Model):
  # Many-to-many (explicit through table)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

# Or implicit M2M
class Book(models.Model):
    tags = models.ManyToManyField(Tag, blank=True)

class Profile(models.Model):
  # One-to-one
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
```

### `on_delete` options

| Option | Behavior |
|--------|----------|
| `CASCADE` | Delete related objects |
| `PROTECT` | Prevent deletion if referenced |
| `SET_NULL` | Set FK to NULL (`null=True` required) |
| `SET_DEFAULT` | Set to default value |
| `DO_NOTHING` | No action (DB constraints may error) |

## Field Options

```python
title = models.CharField(
    max_length=200,
    unique=True,
    db_index=True,
    blank=True,       # Allowed empty in forms
    null=True,        # Stored as NULL in DB
    default='Untitled',
    choices=[('draft', 'Draft'), ('pub', 'Published')],
    validators=[MinLengthValidator(3)],
    help_text='Displayed in admin forms',
)
```

## Custom Validation

```python
from django.core.exceptions import ValidationError

class Article(models.Model):
    publish_date = models.DateField(null=True, blank=True)

    def clean(self):
        if self.is_published and not self.publish_date:
            raise ValidationError('Published articles need a publish date.')

    def save(self, *args, **kwargs):
        self.full_clean()  # Call clean() before save
        super().save(*args, **kwargs)
```

## Abstract & Proxy Models

```python
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # No table created

class Post(TimeStampedModel):
    title = models.CharField(max_length=200)

class PublishedPost(Post):
    class Meta:
        proxy = True  # Same table, different manager/API

    objects = PublishedManager()
```

## Admin Registration

```python
# admin.py
from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_published', 'created_at']
    list_filter = ['is_published']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
```

## Best Practices

### ✅ DO
- Use `related_name` for reverse relations
- Add `__str__` for debugging and admin
- Use `Meta.indexes` for frequently queried fields

### ❌ DON'T
- Don't use `null=True` on `CharField` (use `blank=True` only)
- Don't store computed values without reason (derive in Python/SQL)
- Don't put HTTP logic in models

## Related Notes
- [Database Migrations](/learning/django-database-migrations) - Schema changes
- [QuerySets and Managers](/learning/django-querysets-and-managers) - Querying models
- [Advanced ORM Optimization](/learning/django-advanced-orm-optimization) - Performance
