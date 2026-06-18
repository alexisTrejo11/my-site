# QuerySets & Managers

A **Manager** is the interface to database queries (`Model.objects`). A **QuerySet** is a lazy, chainable collection of database lookups.

## Basic Queries

```python
# All posts
Post.objects.all()

# Filtering
Post.objects.filter(is_published=True)
Post.objects.exclude(author=None)
Post.objects.get(pk=1)  # Raises DoesNotExist / MultipleObjectsReturned

# Ordering & limiting
Post.objects.order_by('-created_at')[:10]

# Field lookups
Post.objects.filter(title__icontains='django')
Post.objects.filter(created_at__year=2024)
Post.objects.filter(author__name='Alice')
```

## Chaining & Laziness

```python
qs = Post.objects.filter(is_published=True)  # No DB hit yet
qs = qs.select_related('author').order_by('-created_at')
posts = list(qs)  # Query executes here
```

## CRUD Operations

```python
# Create
post = Post.objects.create(title='Hello', body='...')
post = Post(title='Hi')
post.save()

# Update
Post.objects.filter(pk=1).update(views=models.F('views') + 1)
post.title = 'New'
post.save(update_fields=['title'])

# Delete
Post.objects.filter(is_published=False).delete()
post.delete()
```

## Q Objects & Complex Logic

```python
from django.db.models import Q

Post.objects.filter(
    Q(title__icontains='django') | Q(title__icontains='python')
).filter(is_published=True)

Post.objects.filter(~Q(author__isnull=True))
```

## Aggregation & Annotation

```python
from django.db.models import Count, Avg, Max

# Per-author stats
Author.objects.annotate(
    book_count=Count('books'),
    avg_price=Avg('books__price'),
)

# Filter on annotations
Author.objects.annotate(
    book_count=Count('books')
).filter(book_count__gte=5)
```

## Custom Managers

```python
class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_published=True)

class Post(models.Model):
    title = models.CharField(max_length=200)
    is_published = models.BooleanField(default=False)

    objects = models.Manager()
    published = PublishedManager()

# Usage
Post.published.all()
```

## QuerySet Methods as Manager API

```python
class PostQuerySet(models.QuerySet):
    def published(self):
        return self.filter(is_published=True)

    def by_author(self, author):
        return self.filter(author=author)

class Post(models.Model):
    objects = PostQuerySet.as_manager()

Post.objects.published().by_author(alice)
```

## Common Patterns

```python
# get_or_create / update_or_create
post, created = Post.objects.get_or_create(slug='hello', defaults={'title': 'Hello'})

# in_bulk
posts = Post.objects.in_bulk([1, 2, 3])

# values for APIs
Post.objects.values('id', 'title')
Post.objects.values_list('id', flat=True)

# earliest / latest
Post.objects.latest('created_at')
```

## Best Practices

### ✅ DO
- Use `get()` only when you expect exactly one row
- Chain filters instead of Python-side filtering large querysets
- Use `F()` expressions for atomic updates

### ❌ DON'T
- Don't evaluate querysets in loops unnecessarily
- Don't use `len(queryset)` — use `.count()` or cache with `list()`
- Don't forget `select_related` / `prefetch_related` (see [Advanced ORM Optimization](/learning/django-advanced-orm-optimization))

## Related Notes
- [Model Definitions Fields](/learning/django-model-definitions-fields) - Model setup
- [Advanced ORM Optimization](/learning/django-advanced-orm-optimization) - N+1, prefetch, indexes
- [Serializers Deep Dive](/learning/django-serializers-deep-dive) - Exposing queryset data in APIs
