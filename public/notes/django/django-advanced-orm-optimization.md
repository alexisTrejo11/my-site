# Advanced ORM Optimization

## The N+1 Query Problem 🔴

One of the most common performance issues in Django.

### Problem Example

```python
# ❌ BAD: N+1 queries (1 for books + N for authors)
books = Book.objects.all()
for book in books:
    print(book.author.name)  # Hits database N times!
```

### Solution 1: `select_related()` (for ForeignKey)

```python
# ✅ GOOD: Single query with JOIN
books = Book.objects.select_related('author').all()
for book in books:
    print(book.author.name)  # No additional queries!

# Multiple relationships
books = Book.objects.select_related('author', 'publisher').all()
```

### Solution 2: `prefetch_related()` (for ManyToMany, reverse FK)

```python
# ✅ GOOD: Two queries (one for books, one for reviews)
books = Book.objects.prefetch_related('reviews').all()
for book in books:
    print(f"{book.title}: {len(book.reviews.all())} reviews")

# Prefetching nested relationships
books = Book.objects.prefetch_related(
    'reviews__user',  # Reviews and their authors
    'author__profile'  # Author and their profile
).all()
```

## Advanced Prefetching

### Custom Prefetch Objects

```python
from django.db.models import Prefetch

# Prefetch with filters and ordering
active_reviews = Prefetch(
    'reviews',
    queryset=Review.objects.filter(is_approved=True).order_by('-created_at'),
    to_attr='active_reviews'  # Custom attribute name
)

books = Book.objects.prefetch_related(active_reviews).all()
```

### `prefetch_related_objects()` (for already loaded instances)

```python
from django.db.models import prefetch_related_objects

books = list(Book.objects.all())  # Already fetched
prefetch_related_objects(books, 'reviews__user')  # Now prefetch
```

## Query Optimization Techniques

### 1. Use `only()` and `defer()`

```python
# Fetch only needed fields
users = User.objects.only('id', 'email', 'username')

# Defer heavy fields
posts = Post.objects.defer('content', 'raw_html')  # Fetch when accessed
```

### 2. Use `values()` and `values_list()`

```python
# Return dictionaries (fast for JSON APIs)
data = Book.objects.values('title', 'author__name')

# Return tuples (even faster)
data = Book.objects.values_list('id', flat=True)  # [1,2,3]
```

### 3. Use `exists()` instead of `count()`

```python
# ❌ BAD: Counts all rows
if Book.objects.filter(title__icontains='django').count() > 0:

# ✅ GOOD: Stops at first match
if Book.objects.filter(title__icontains='django').exists():
```

### 4. Use `update()` and `delete()` in bulk

```python
# ❌ BAD: One query per object
for book in books:
    book.is_published = True
    book.save()

# ✅ GOOD: Single query
Book.objects.filter(published_date__lt=timezone.now()).update(
    is_published=True
)
```

## Database Indexing

### Creating Indexes

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    published_date = models.DateField()
    
    class Meta:
        indexes = [
            models.Index(fields=['published_date']),
            models.Index(fields=['author', 'published_date']),  # Composite
            models.Index(fields=['title'], name='title_idx'),
        ]
```

### When to Index

✅ **Index these:**
- Fields used in `filter()`, `exclude()`, `order_by()`
- ForeignKey fields
- Fields with high cardinality (many unique values)

❌ **Don't index:**
- Boolean fields
- Fields with low cardinality (e.g., status with 3 options)
- Tables with very few rows

## QuerySet Caching

### Understanding QuerySet Cache

```python
# QuerySets are lazy - not evaluated until needed
books = Book.objects.filter(published=True)  # No query yet

# First evaluation caches the result
list(books)  # Executes query, caches

# Second evaluation uses cache
books[0]  # Uses cache, no query!
```

### Breaking Cache

```python
# Cache is tied to the QuerySet instance
books = Book.objects.all()
books[0]  # Caches entire result set

# New QuerySet = new query
recent_books = Book.objects.filter(published_date__gte=one_year_ago)
```

## Bulk Operations

### `bulk_create()` - Insert many objects

```python
books = [
    Book(title=f"Book {i}", author=author)
    for i in range(1000)
]
Book.objects.bulk_create(books)  # One INSERT with many values
```

### `bulk_update()` - Update many objects

```python
for book in books:
    book.is_published = True
Book.objects.bulk_update(books, ['is_published'])
```

## Query Analysis Tools

### 1. `connection.queries` - Debug queries

```python
from django.db import connection

books = Book.objects.select_related('author').all()
print(connection.queries)  # See raw SQL (DEBUG=True only)
```

### 2. Django Debug Toolbar

```python
# Install
pip install django-debug-toolbar

# Shows:
# - Number of queries
# - Duplicate queries
# - Slow queries
# - Query timing
```

### 3. `explain()` - Database execution plan

```python
print(Book.objects.filter(author__name='Django').explain())
# Shows how PostgreSQL will execute the query
```

## Real-World Optimization Examples

### Example 1: Dashboard with stats

```python
# ❌ BAD: Many queries
for user in User.objects.all():
    post_count = user.posts.count()
    comment_count = user.comments.count()
    
# ✅ GOOD: Annotate and prefetch
from django.db.models import Count, Prefetch

users = User.objects.annotate(
    post_count=Count('posts'),
    comment_count=Count('comments')
).prefetch_related(
    Prefetch('posts', queryset=Post.objects.only('title'))
)
```

### Example 2: Nested comments (recursive)

```python
# Using `select_related` for parent references
comments = Comment.objects.select_related('parent', 'user').filter(post=post)

# Prefetch for replies (limited depth)
replies = Prefetch('replies', queryset=Comment.objects.select_related('user'))
comments = Comment.objects.filter(parent__isnull=True).prefetch_related(replies)
```

## Performance Checklist

- [ ] Is `select_related()` used for ForeignKey relationships?
- [ ] Is `prefetch_related()` used for ManyToMany/reverse FK?
- [ ] Are there any N+1 queries? (Check with Django Debug Toolbar)
- [ ] Are indexes created on frequently filtered fields?
- [ ] Is `only()`/`defer()` used to limit fetched fields?
- [ ] Are bulk operations used for mass updates/inserts?
- [ ] Is `exists()` used instead of `count() > 0`?
- [ ] Are unnecessary queries cached properly?

## Related Notes
- [QuerySets and Managers](/learning/django-querysets-and-managers) - Basic queries
- [Security Best Practices](/learning/django-security-best-practices) - Security optimization
- [DRF Architecture Overview](/learning/django-drf-architecture-overview) - API optimization
