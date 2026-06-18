# Database Migrations

Migrations are Django's version control for your database schema. Each migration file describes incremental changes.

## Migration Workflow

```mermaid
flowchart LR
    A[Change models.py] --> B[makemigrations]
    B --> C[Review migration file]
    C --> D[migrate]
    D --> E[Database updated]
```

```bash
python manage.py makemigrations
python manage.py migrate
```

## What Gets Generated

```python
# blog/migrations/0002_add_slug.py
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(default='', max_length=200),
            preserve_default=False,
        ),
    ]
```

## Common Operations

```python
# In migrations or RunPython
migrations.CreateModel(...)
migrations.DeleteModel(...)
migrations.AddField(...)
migrations.RemoveField(...)
migrations.AlterField(...)
migrations.RenameField(...)
migrations.AddIndex(...)
migrations.RunPython(forward_func, reverse_func)
migrations.RunSQL('CREATE INDEX ...', 'DROP INDEX ...')
```

## Data Migrations

```python
def populate_slugs(apps, schema_editor):
    Post = apps.get_model('blog', 'Post')
    for post in Post.objects.all():
        post.slug = slugify(post.title)
        post.save(update_fields=['slug'])

class Migration(migrations.Migration):
    dependencies = [('blog', '0002_add_slug_field')]

    operations = [
        migrations.RunPython(populate_slugs, migrations.RunPython.noop),
    ]
```

> Use `apps.get_model()` in migrations — not direct model imports.

## Squashing Migrations

Combine many migrations into one for cleaner history:

```bash
python manage.py squashmigrations blog 0001 0015
```

## Rollback

```bash
# Roll back to specific migration
python manage.py migrate blog 0003

# Show SQL without applying
python manage.py sqlmigrate blog 0004
```

## Multi-Database

```python
# settings.py
DATABASES = {
    'default': {...},
    'analytics': {...},
}

# Route migrations
class Post(models.Model):
    class Meta:
        app_label = 'blog'

# migrate --database=analytics
```

## Production Tips

### ✅ DO
- Review generated migrations before committing
- Test migrations on a copy of production data
- Use `--plan` to preview: `migrate --plan`
- Backup database before destructive changes

### ❌ DON'T
- Don't edit applied migrations in production (create new ones)
- Don't delete migration files that teammates have applied
- Don't use `RunPython` for large datasets without batching

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `InconsistentMigrationHistory` | Align migration files across branches |
| Circular dependency | Merge migrations or fix `dependencies` |
| Fake apply | `migrate --fake blog 0005` (mark applied, no SQL) |

## Related Notes
- [Model Definitions Fields](/learning/django-model-definitions-fields) - Model definitions
- [Django CLI and Manage](/learning/django-cli-and-manage) - CLI commands
- [QuerySets and Managers](/learning/django-querysets-and-managers) - Using migrated schema
