# Django CLI & manage.py

`manage.py` is the command-line utility for administrative tasks. Every command runs through Django's management framework.

## Project vs django-admin

```bash
django-admin startproject mysite    # Creates new project (global)
python manage.py runserver          # Runs within existing project
```

Both use the same commands; `manage.py` sets `DJANGO_SETTINGS_MODULE` automatically.

## Essential Commands

### Development server
```bash
python manage.py runserver
python manage.py runserver 8080
python manage.py runserver 0.0.0.0:8000
```

### Apps
```bash
python manage.py startapp blog
```

### Database
```bash
python manage.py makemigrations
python manage.py makemigrations blog --name add_slug
python manage.py migrate
python manage.py migrate blog 0003
python manage.py showmigrations
python manage.py sqlmigrate blog 0001
```

### Users & admin
```bash
python manage.py createsuperuser
python manage.py changepassword username
```

### Shell & debugging
```bash
python manage.py shell
python manage.py shell_plus          # django-extensions
python manage.py dbshell
python manage.py check
python manage.py check --deploy      # Production readiness
```

### Static files
```bash
python manage.py collectstatic
python manage.py findstatic admin/css/base.css
```

## Custom Management Commands

```python
# blog/management/commands/seed_posts.py
from django.core.management.base import BaseCommand
from blog.models import Post

class Command(BaseCommand):
    help = 'Seed the database with sample blog posts'

    def add_arguments(self, parser):
        parser.add_argument('--count', type=int, default=10)

    def handle(self, *args, **options):
        count = options['count']
        for i in range(count):
            Post.objects.create(title=f'Post {i}', body='Sample content')
        self.stdout.write(self.style.SUCCESS(f'Created {count} posts'))
```

```bash
python manage.py seed_posts --count=5
```

### Command structure
```
myapp/
└── management/
    ├── __init__.py
    └── commands/
        ├── __init__.py
        └── seed_posts.py
```

## Environment Variables

```bash
# Run with different settings module
DJANGO_SETTINGS_MODULE=myproject.settings.production python manage.py migrate

# Or use --settings flag
python manage.py runserver --settings=myproject.settings.development
```

## Useful Flags

| Flag | Effect |
|------|--------|
| `--verbosity 2` | More output (0-3) |
| `--no-input` | Skip prompts (CI/CD) |
| `--database=other` | Target non-default DB |
| `--fake` | Mark migration applied without running SQL |

## Testing Commands

```bash
python manage.py test
python manage.py test blog.tests.test_models
python manage.py test --keepdb
python manage.py test --parallel auto
```

## Best Practices

### ✅ DO
- Use custom commands for repeatable ops (seeding, cleanup, reports)
- Run `check --deploy` before production releases
- Pin settings module in production via env var

### ❌ DON'T
- Don't run `runserver` in production (use Gunicorn/Uvicorn)
- Don't commit secrets into settings — use env vars
- Don't skip migrations in CI (`migrate --noinput`)

## Related Notes
- [Project vs App Structure](/learning/django-project-vs-app-structure) - Project layout
- [Database Migrations](/learning/django-database-migrations) - Migration internals
- [Django MOC](/learning/django-master-moc) - Full command quick reference
