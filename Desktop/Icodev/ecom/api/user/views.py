from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializers
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login , logout
import re

# Create your views here.
import random

def generate_session_token(length=10):
	return ''.join(random.SystemRandom().choice(
		[chr(i) for i in range(97,123)]+
		[str(i) for i in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
	print("------------------",request)
	if not request.method =="POST":
		return JsonResponse({'error':'Send a POST request with valid parameters'})

	username=request.POST['email']
	password=request.POST['password']


	# if not re.match("\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b",username):
	# 	return JsonResponse({'error':'Enter valid email'})

	if len(password) < 3:
		return JsonResponse({'error':'password need to be atleast 3 char'})



	UserModel=get_user_model()

	try:
		user = UserModel.objects.get(email=username)

		if user.check_password(password):
			usr_dict =UserModel.objects.filter(email=username).values().first()
			usr_dict.pop('password')

			if user.session_token!="0":
				user.session_token="0"
				user.save()
				return JsonResponse({'error':'previous session exists'})

			token=generate_session_token()
			user.session_token=token
			user.save()
			login(request,user)
			return JsonResponse({'token':token,'user':usr_dict})

		else:
			return JsonResponse({"error":"invalid password"})
	except UserModel.DoesNotExist:
		return JsonResponse({'error':'invalid email'})


def signout(request,id):
	logout(request)

	UserModel=get_user_model()

	try:
		user=UserModel.objects.get(pk=id)
		user.session_token="0"
		user.save()

	except UserModel.DoesNotExist:
		return JsonResponse({'error':'Invalid user id'})

	return JsonResponse({'success':'logout success'})


class UserViewSet(viewsets.ModelViewSet):
	permission_classes_by_action={'create':[AllowAny]}

	queryset=CustomUser.objects.all().order_by('id')
	serializer_class=UserSerializers

	def get_permission(self):
		try:
			return [permission() for permission in self.permission_classes_by_action[self.action]]

		except KeyError:
			return [permission() for permission in self.permission_classes]