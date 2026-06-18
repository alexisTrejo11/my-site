# Serializers Deep Dive

Serializers convert complex types (models, querysets) to native Python datatypes that render to JSON/XML, and validate incoming data.

## ModelSerializer

```python
from rest_framework import serializers
from .models import Book, Author

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'email']
        read_only_fields = ['id']

class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'author_name', 'published_date']
        extra_kwargs = {
            'published_date': {'required': False},
        }
```

## Nested Serializers

```python
class BookDetailSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'reviews']
```

For writes with nested data, prefer explicit create/update logic or `PrimaryKeyRelatedField`.

## Custom Fields & Validation

```python
class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError('Passwords do not match.')
        return data

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered.')
        return value

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        return User.objects.create_user(**validated_data)
```

## SerializerMethodField

```python
class PostSerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'comment_count']

    def get_comment_count(self, obj):
        return obj.comments.count()  # Prefer annotate() in view for performance
```

## HyperlinkedModelSerializer

```python
class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['url', 'title', 'author']
        extra_kwargs = {
            'url': {'view_name': 'book-detail', 'lookup_field': 'pk'}
        }
```

## Partial Updates

```python
serializer = BookSerializer(book, data=request.data, partial=True)
if serializer.is_valid():
    serializer.save()
```

## ListSerializer & Bulk

```python
class BookListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        return Book.objects.bulk_create([Book(**item) for item in validated_data])

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author']
        list_serializer_class = BookListSerializer
```

## Context

```python
# In view
serializer = PostSerializer(post, context={'request': request})

# In serializer
def create(self, validated_data):
    validated_data['author'] = self.context['request'].user
    return super().create(validated_data)
```

## Performance Tips

```python
# In ViewSet
def get_queryset(self):
    return Book.objects.select_related('author').prefetch_related('reviews')
```

Avoid N+1 in `SerializerMethodField` — annotate in queryset instead.

## Best Practices

### ✅ DO
- Use `read_only` / `write_only` appropriately
- Validate at serializer level, not only in models
- Keep serializers focused (list vs detail serializers)

### ❌ DON'T
- Don't expose password hashes or internal fields
- Don't run heavy queries per object in `get_*` methods
- Don't nest deep writable serializers without transaction control

## Related Notes
- [API Views and ViewSets](/learning/django-api-views-and-viewsets) - Using serializers in views
- [Authentication Permissions](/learning/django-authentication-permissions) - User context in serializers
- [Advanced ORM Optimization](/learning/django-advanced-orm-optimization) - Query optimization
