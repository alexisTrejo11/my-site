# API Views & ViewSets

DRF offers multiple view layers: function-based (`@api_view`), class-based (`APIView`), and resource-oriented (`ViewSet`).

## APIView

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class BookListAPIView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## Generic API Views

```python
from rest_framework import generics

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

## ViewSets

```python
from rest_framework import viewsets
from rest_framework.decorators import action

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        author = self.request.query_params.get('author')
        if author:
            qs = qs.filter(author_id=author)
        return qs.select_related('author')

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        book = self.get_object()
        book.is_published = True
        book.save()
        return Response({'status': 'published'})

    @action(detail=False, methods=['get'])
    def recent(self, request):
        books = self.get_queryset().order_by('-created_at')[:5]
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)
```

Custom actions map to URLs like `/books/{pk}/publish/` and `/books/recent/`.

## Routers

```python
from rest_framework.routers import DefaultRouter, SimpleRouter

router = DefaultRouter()  # Includes API root view
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
```

## Mixins & Custom ViewSets

```python
from rest_framework import mixins, viewsets

class ReadOnlyBookViewSet(mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          viewsets.GenericViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

## Function-Based API Views

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def book_list(request):
    if request.method == 'GET':
        ...
    elif request.method == 'POST':
        ...
```

## Filtering, Search, Ordering

```bash
pip install django-filter
```

```python
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

class BookViewSet(viewsets.ModelViewSet):
    filterset_fields = ['author', 'is_published']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']
```

## Pagination

```python
class BookViewSet(viewsets.ModelViewSet):
    pagination_class = PageNumberPagination  # or CursorPagination for large datasets
```

## View Layer Comparison

| Pattern | Best for |
|---------|----------|
| `@api_view` | Single endpoint, quick prototypes |
| `APIView` | Custom logic per method |
| `generics.*` | Standard CRUD with less boilerplate |
| `ViewSet` + Router | Full REST resources, custom actions |

## Best Practices

### ✅ DO
- Override `get_queryset()` to scope data per user
- Use `perform_create()` / `perform_update()` for side effects
- Use `@action` for non-CRUD operations

### ❌ DON'T
- Don't put business logic only in serializers — coordinate in views/services
- Don't return 200 with error payloads — use proper status codes
- Don't forget throttling on public endpoints

## Related Notes
- [Serializers Deep Dive](/learning/django-serializers-deep-dive) - Data layer
- [Authentication Permissions](/learning/django-authentication-permissions) - Securing views
- [DRF Architecture Overview](/learning/django-drf-architecture-overview) - Big picture
