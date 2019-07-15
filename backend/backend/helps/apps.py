from django.apps import AppConfig


class HelpsAppConfig(AppConfig):
    name = "backend.helps"
    verbose_name = "Helps"

    def ready(self):
        try:
            import users.signals  # noqa F401
        except ImportError:
            pass