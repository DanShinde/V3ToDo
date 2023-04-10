from django.http import Http404
from django.shortcuts import render
from .models import todoModel
from .serializers import ToDoSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView


def index(request):
    return render(request, 'index.html')


class ToDoList(APIView):

    def get(self, request):
        todos = todoModel.objects.all()
        serializer = ToDoSerializer(todos, many = True)
        return Response(serializer.data)


class ToDoView(APIView):

    def get_todo_by_pk(self, pk):
        try:
            todo = todoModel.objects.get(id=pk)
            return todo
        except todoModel.DoesNotExist as e:
            raise Http404('ToDo not found') from e
        
    def get(self, request, pk):
        todo = self.get_todo_by_pk(pk)
        serializer = ToDoSerializer(todo)
        return Response(serializer.data)

    def post(self, request):
        serializer = ToDoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    

    def put(self, request, pk):
        todo = todoModel.objects.get(id=pk)
        serializer= ToDoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk):
        todo = todoModel.objects.get(id=pk)
        todo.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    
