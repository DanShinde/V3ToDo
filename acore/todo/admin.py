from django.contrib import admin
from .models import todoModel
# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'description', 'progress', 'created_at', 'updated_at')

admin.site.register(todoModel, TodoAdmin)