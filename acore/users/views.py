import subprocess
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import LoginSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import git


@csrf_exempt
def git_update(request):
    if request.method != "POST":
        return HttpResponse("Couldn't update the code on PythonAnywhere")
    '''
        pass the path of the diectory where your project will be 
        stored on PythonAnywhere in the git.Repo() as parameter.
        Here the name of my directory is "test.pythonanywhere.com"
        '''
    repo = git.Repo('/home/webpack/V3ToDo')
    origin = repo.remotes.origin
    origin.pull()
    # Run 'collectstatic' command using subprocess
    cmd = 'python manage.py collectstatic'
    cmd = 'echo "yes" | python manage.py collectstatic'

    subprocess.run(cmd, shell=True, cwd='/home/webpack/V3ToDo/acore')

    return HttpResponse("Updated code on PythonAnywhere")

class LoginAPI(APIView):

    def post(self, request):
        # sourcery skip: remove-unnecessary-else, remove-unreachable-code, swap-if-else-branches
        try:
            data = request.data
            serializer = LoginSerializer(data=data)
            if serializer.is_valid():
                username = serializer.data['username']
                password = serializer.data['password']
                user = authenticate(username= username, password=password)

                if user is None:
                    return Response({
                        'status': 400,
                        'message': 'Invalid username or password',
                        'data': {}
                    })

                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({
                    'status': 400,
                    'message': 'Invalid data',
                    'data': serializer.errors
                })
            print("Form is not valid")
            
        except Exception as e:
            print(e)
            return Response({
                'status': 500,
                'message': 'Internal Server Error',
                'data': {}
            })
