# Security Best Practices

Django ships with many security features, but production safety depends on configuration and discipline.

## Production Settings Checklist

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Run: python manage.py check --deploy
```

## CSRF Protection

Django validates CSRF tokens on unsafe methods (POST, PUT, DELETE) for session-based forms.

```html
<form method="post">
  {% csrf_token %}
  ...
</form>
```

For APIs with JWT, CSRF is less relevant for token-based auth — but session auth in SPAs needs care.

## SQL Injection

The ORM parameterizes queries — avoid raw SQL with string formatting.

```python
# ❌ BAD
User.objects.raw(f"SELECT * FROM users WHERE name = '{name}'")

# ✅ GOOD
User.objects.raw("SELECT * FROM users WHERE name = %s", [name])
```

## XSS Protection

Templates auto-escape variables by default.

```html
{{ user_input }}           <!-- escaped -->
{{ user_input|safe }}      <!-- only if trusted -->
```

In DRF, never mark untrusted data safe in HTML responses.

## Password Security

```python
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
]
```

Use `make_password()` / `create_user()` — never store plain text.

## Permission & Authorization

```python
@permission_required('blog.delete_post')
def delete_post(request, pk):
    ...

# Object-level in DRF
def has_object_permission(self, request, view, obj):
    return obj.author == request.user
```

Always check permissions in views, not only hiding UI buttons.

## Rate Limiting

```bash
pip install django-ratelimit
# or use API gateway / nginx limit_req
```

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    },
}
```

## Secrets Management

### ✅ DO
- Use environment variables or secret managers
- Rotate `SECRET_KEY` and API keys on compromise
- Separate settings modules per environment

### ❌ DON'T
- Don't commit `.env` files
- Don't expose `DEBUG=True` or stack traces publicly
- Don't log passwords, tokens, or PII

## Security Headers Middleware

`SecurityMiddleware` sets HSTS, SSL redirect, and related headers when configured.

## Dependency Hygiene

```bash
pip install pip-audit safety
pip-audit
```

Keep Django and DRF updated for security patches.

## Related Notes
- [Authentication Permissions](/learning/django-authentication-permissions) - API auth
- [Middleware Chain](/learning/django-middleware-chain) - Security middleware
- [Advanced ORM Optimization](/learning/django-advanced-orm-optimization) - Safe querying
