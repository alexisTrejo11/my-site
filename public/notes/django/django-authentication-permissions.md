# Authentication & Permissions in DRF

## Authentication vs Authorization

- **Authentication**: Who are you? (Identity verification)
- **Authorization**: What can you do? (Permission checking)

## Built-in Authentication Classes

### 1. Session Authentication
```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ]
}

# Uses Django's session framework
# Good for: Web browsers, same-site AJAX
```

### 2. Token Authentication
```python
INSTALLED_APPS = [
    'rest_framework.authtoken',  # Add to INSTALLED_APPS
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}

# Generate tokens
from rest_framework.authtoken.models import Token
token = Token.objects.create(user=user)

# Client sends: Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

### 3. JWT (JSON Web Token) - Most popular for APIs

```bash
pip install djangorestframework-simplejwt
```

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
}
```

```python
# urls.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]
```

## Permission Classes

### Built-in Permissions

```python
from rest_framework.permissions import (
    AllowAny,           # Anyone can access
    IsAuthenticated,    # Only logged-in users
    IsAdminUser,        # Staff users only
    IsAuthenticatedOrReadOnly,  # Read: anyone, Write: auth users
)

# View-level
class BookViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    
# Global-level
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}
```

### Custom Permissions

```python
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners to edit objects.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions only for owner
        return obj.owner == request.user

class IsTeacherOrStudent(permissions.BasePermission):
    """
    Teachers can do anything, students can only read.
    """
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
            
        if request.user.role == 'teacher':
            return True
            
        # Students can only GET (read)
        return request.method == 'GET'
```

## Implementing Authentication in Views

### Class-Based Views
```python
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class OrderView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # request.user is authenticated
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
```

### Function-Based Views
```python
from rest_framework.decorators import api_view, authentication_classes, permission_classes

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user)
    return Response(OrderSerializer(orders, many=True).data)
```

### ViewSets
```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own posts
        return Post.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        # Auto-set author on creation
        serializer.save(author=self.request.user)
```

## JWT Flow (Detailed)

```mermaid
sequenceDiagram
    Client->>API: POST /api/token/ (username/password)
    API->>Client: {access_token, refresh_token}
    
    Client->>API: GET /api/posts/ (Authorization: Bearer access_token)
    API->>API: Verify JWT signature
    API->>Client: Protected data
    
    Note over Client,API: Access token expires after 15 min
    Client->>API: POST /api/token/refresh/ (refresh_token)
    API->>Client: {new_access_token}
```

### Implementing JWT
```python
# views.py
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data['username'],
            password=request.data['password']
        )
        
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials'}, status=400)
```

## Custom Authentication Backend

```python
# authentication.py
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

class EmailAuthBackend(BaseBackend):
    """Authenticate using email instead of username."""
    
    def authenticate(self, request, username=None, password=None):
        try:
            user = User.objects.get(email=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
```

```python
# settings.py
AUTHENTICATION_BACKENDS = [
    'myapp.authentication.EmailAuthBackend',
    'django.contrib.auth.backends.ModelBackend',  # Keep default as fallback
]
```

## Permission Combinations

### Using multiple permission classes (AND logic)
```python
class SecureView(APIView):
    # User must satisfy ALL permission classes
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
```

### OR logic (custom implementation)
```python
class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """Custom OR permission."""
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
```

## Security Best Practices

### ✅ DO
- Use JWT for stateless APIs (SPA, mobile)
- Use Session auth for server-rendered apps
- Rotate refresh tokens
- Set short access token lifetimes (5-15 minutes)
- Store tokens securely (HttpOnly cookies for web, secure storage for mobile)

### ❌ DON'T
- Don't store tokens in localStorage (vulnerable to XSS)
- Don't log tokens
- Don't use Basic Authentication over HTTP (use HTTPS)
- Don't hardcode secrets in settings

### HTTPS Everywhere
```python
# settings.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

## Testing Authentication

```python
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class AuthTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
    
    def test_jwt_auth(self):
        # Get token
        response = self.client.post('/api/token/', {
            'username': 'testuser',
            'password': 'testpass123'
        })
        token = response.data['access']
        
        # Use token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get('/api/protected/')
        self.assertEqual(response.status_code, 200)
```

## Related Notes
- [Serializers Deep Dive](/learning/django-serializers-deep-dive) - Data validation
- [API Views and ViewSets](/learning/django-api-views-and-viewsets) - View configurations
- [Security Best Practices](/learning/django-security-best-practices) - General security
