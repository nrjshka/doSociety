from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import User

# 

def index(request):
	if request.POST.get('commit', False):
		#если было нажато "войти"
		try:
			#получаем юзера по его логину, если такого нет, то выходим
			user = User.objects.get(login__exact = request.POST['login'])
			#проверяем логин и пароль, если подходит -> редирект на другую страницу
			if user.auth(request.POST['login'], request.POST['password']):
				return redirect('/feed')
		except User.DoesNotExist:
			pass
	return render(request, 'society/index/index.html', {})