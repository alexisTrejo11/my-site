# Function-Based Views (FBV)

FBVs are plain Python functions that take `request` and return `HttpResponse`. Simple and explicit — ideal for small endpoints.

## Basic View

```python
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import Post
from .forms import PostForm

def post_list(request):
    posts = Post.objects.filter(is_published=True)
    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})
```

## HTTP Methods

```python
from django.views.decorators.http import require_http_methods, require_GET, require_POST

@require_GET
def post_list(request):
    ...

@require_http_methods(['GET', 'POST'])
def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post-list')
    else:
        form = PostForm()
    return render(request, 'blog/post_form.html', {'form': form})
```

## Common Decorators

```python
from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt  # Use sparingly!

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

@permission_required('blog.change_post')
def edit_post(request, pk):
    ...

@cache_page(60 * 15)
def popular_posts(request):
    ...
```

## JSON / API (without DRF)

```python
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

@require_POST
def api_create_post(request):
    data = json.loads(request.body)
    post = Post.objects.create(title=data['title'], body=data['body'])
    return JsonResponse({'id': post.id, 'title': post.title}, status=201)
```

Prefer DRF for production APIs — see [DRF Architecture Overview](/learning/django-drf-architecture-overview).

## Messages Framework

```python
from django.contrib import messages

def post_create(request):
    if form.is_valid():
        form.save()
        messages.success(request, 'Post created successfully.')
        return redirect('post-list')
```

## When to Use FBV

| Use FBV when | Use CBV when |
|--------------|--------------|
| Simple one-off logic | CRUD with generic views |
| Highly custom flow | Reusable patterns (ListView, etc.) |
| Easy to read for beginners | Mixins and inheritance help |

## Best Practices

### ✅ DO
- Keep views focused; extract services for complex logic
- Always validate and authorize before mutations
- Use `get_object_or_404` instead of bare `.get()`

### ❌ DON'T
- Don't duplicate POST/GET branches — consider CBV or separate URLs
- Don't disable CSRF without a strong reason
- Don't return sensitive data in error messages

## Related Notes
- [Class Based Views](/learning/django-class-based-views) - CBV alternative
- [URL Routing and Resolvers](/learning/django-url-routing-and-resolvers) - Wiring URLs
- [API Views and ViewSets](/learning/django-api-views-and-viewsets) - DRF views
