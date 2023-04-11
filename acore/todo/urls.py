from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [

    path('<int:pk>/', views.ToDoView.as_view(), name = 'todo-detail'),
    path('new/', views.ToDoView.as_view(), name = 'addnew'),
    path('', views.ToDoList.as_view(), name = 'list'),

    path('<int:pk>/update/', views.ToDoView.as_view(), name='todo-update'),
    path('<int:pk>/delete/', views.ToDoView.as_view(), name='todo-delete'),
]
    # path('todo/<int:pk>/', ToDoView.as_view(), name='todo-detail'),
    # path('', views.ToDoView.as_view(), name='list'),