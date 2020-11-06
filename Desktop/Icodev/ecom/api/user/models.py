from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
	name=models.CharField(max_length=50, default="Ananymous")
	email=models.EmailField(max_length=50, unique=True)

	username=None
	USERNAME_FIELD='email'
	REQUIRED_FIELDS=[]

	phone=models.CharField(max_length=50,blank=True,null=True)
	gender=models.CharField(max_length=50,blank=True,null=True)
	session_token=models.CharField(max_length=50,default=0)
	created_date=models.DateTimeField(auto_now_add=True)
	updated_date=models.DateTimeField(auto_now=True)

