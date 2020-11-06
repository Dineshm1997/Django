import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone
from api.user.models import CustomUser

class Migration(migrations.Migration):
	def seed_data(apps,schema_editor):
		user=CustomUser(name="dinesh",
						email="dinidinesh333@gmail.com",
						is_staff=True,
						is_superuser=True,
						phone="990990990",
						gender="Male")
		user.set_password("12345")
		user.save()

	dependencies=[
	]
	operations=[
		migrations.RunPython(seed_data),
	]