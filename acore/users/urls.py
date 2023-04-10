from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.LoginAPI.as_view(), name = 'login'),
    path('git_update/', views.git_update, name = 'git-update'),
   
]
