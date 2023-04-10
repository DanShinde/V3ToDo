from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views.getTodos, name = 'todo'),
    # path('create/', views.createTodos, name = 'newTodo'),
    # path('<int:pk>/', views.useTodo, name = 'useTodo'),
    
    path('<int:pk>/', views.ToDoView.as_view(), name = 'todo'),
    path('', views.ToDoList.as_view(), name = 'list'),
]
