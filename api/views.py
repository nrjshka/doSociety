#!/usr/bin/python
# -*- coding: utf-8 -*-
from rest_framework import viewsets
from django.db.models import Q
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponseBadRequest
from rest_framework.views import APIView
from .serializers import *
from society.models import User
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from message.models import Message
from vkGroups.models import vkGroup 
import threading

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	permission_classes = ()

class GetId(APIView):
	''' отправляет id пользователю в ответ на его токен в хедере и логин(переделать) '''
	#класс доступа - Токен JWT
	permission_classes = (IsAuthenticated,)

	''' отправляет id пользователя по логину '''
	def get(self, request, format = None):
		#определяем пользователя
		userName = request.user.username
		if User.objects.get(username = userName):
			#отправляем id пользователя
			id = str(User.objects.get(username = userName).id)
			urlid = str(User.objects.get(username = userName).urlid)
			return Response({'id': id, 'urlid': urlid})
		#если "плохой" запрос, то отправляем ошибку
		return HttpResponseBadRequest()

class GetUserInfo(APIView):
	''' отправляет личную информацию о пользователе в ответ на его id '''
	permission_classes = ()
	renderer_classes = {JSONRenderer, }

	def post(self, request, formant = None):
		#определяем есть ли такой человек, если нет, то выдаем ошибку
		try:
			user = User.objects.get(id = request.data['id'])
			#возвращаем сериализованные данные
			return Response(UserInfoSerializer(user).data)
		except User.DoesNotExist:
			#если не нашли человека, то отправляем ошибку
			return HttpResponseBadRequest()
			
class GetUserSettings(APIView):
	''' отправляет настройки пользователю в ответ на его токен '''

	permission_classes = (IsAuthenticated,)

	def get(self, request, format = None):
		#мы должны отправить ему список настроек
		return Response(UserSettingsSerializer(User.objects.get(username = request.user.username)).data)

class CheckUserPassword(APIView):
	''' проверяет текущий и действующий пароль, требует токена '''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		#должны проверить пароль и прислать ответ
		if request.data['password']:
			#если нам передали пароль
			#получаем пользователя
			user = User.objects.get(username = request.user.username)
			#проверяем присланный пароль и действующий
			if check_password(request.data['password'], user.password):
				#пароли совпадают
				return Response({'status': True})
			else:
				#пароли не совпали
				return Response({'status': False})
		else:
			#если нам не прислали старый пароль
			return HttpResponseBadRequest()

class ChangeUserPassword(APIView):
	''' меняет пароль пользователя на полученный, требует токена пользователя '''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		if request.data['password']:
			#получаем пользователя
			user = User.objects.get(username = request.user.username)
			#меняем ему пароль
			user.set_password(request.data['password'])
			#сохраняем изменения
			user.save()
			user.timeSetPassword = date.today()
			#нужно еще поменять дату последнего изменения пароля
			#отправляем "удачный ответ"
			return Response({'status': True})
		else:
			#если не было получено пароля
			return HttpResponseBadRequest()

class ChangeUserUrl(APIView):
	''' меняет url или говорит, что url занят'''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		if request.data['newUrl']:
			#получаем данные из newUrl и ищем занят ли url или нет
			try:
				user = User.objects.get(urlid = request.data['newUrl'])
			except User.DoesNotExist:
				user = None
			#если не нашли никого с желаемым url или это наш старый адрес
			if not(user) or User.objects.get(username = request.user.username).urlid == request.data['newUrl']:
				#получаем нашего пользователя
				user = User.objects.get(username = request.user.username)
				user.urlid = request.data['newUrl']
				user.save()
				return Response({'status': True})
			return Response({'status': False})
		else:
			#пробрасываем ошибку в обратном случае
			return HttpResponseBadRequest()

class ChangeUserLogin(APIView):
	''' меняет login на присланный '''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		if request.data['newLogin']:
			#получаем пользователя
			user = User.objects.get(username = request.user.username)
			user.username = request.data['newLogin']
			user.save()
			return Response({'status': True})
		else:
			#пробрасываем ошибку в обратном случае
			return HttpResponseBadRequest()

class GetMessageData(APIView):
	''' получает стартовые данные сообщения в формате json для общения'''
	#curl -H "Accept: application/json" -H "Content-type: application/json" -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im0xNDA1NzRAZ21haWwuY29tIiwib3JpZ19pYXQiOjE1MDYyNDgwODksInVzZXJfaWQiOjIsImV4cCI6MTUzNzM1MjA4OX0.oL0Nl6Zem1qOotOoQKxp4Evr17t8aoaog5FMUSspz5g" -X POST -d '{"receiver_id": 2}' 127.0.0.1:8000/api/getmessagedata/

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		#TODO: переписать структуру данных message 
		if request.data['receiver_id']:
			''' если все "ок", то мы должны
				написать свой сериалайзер, 
				который будет удобен для представления '''
			output = []

			#получаем отправителя и получателя
			sender1 = User.objects.get(username = request.user.username)
			sender2 = User.objects.get(id = request.data['receiver_id'])
			
			query1 = Q(sender = sender1)
			query1.add(Q(receiver = sender2), Q.AND)
			
			query2 = Q(sender = sender2)
			query2.add(Q(receiver = sender1), Q.AND)
			
			query1.add(query2, Q.OR)
			
			#print(query1)
			
			messages = Message.objects.all().filter(query1)
			
			#print(messages)
			
			prev = False
			localStorage = {}

			#TODO: отрефакторить код
			for msg in messages:
				#messages.all()[0].sender.all()[0]
				#msg.sender.all()[0]
				#будем писать охренеть какое дерьмо
				if prev == False:
					prev = msg.sender.all()[0]
					localStorage = {
						'sender': prev.id,
						'author': prev.name + " " +prev.surname,
						'author_foto': prev.user_foto,
						'messages': [
							{
								'id': msg.id,
								'time': msg.time,
								'text': msg.text
							}
						],
					}
				elif prev == msg.sender.all()[0]:
					localStorage['messages'].append({
						'id': msg.id,
						'time': msg.time,
						'text': msg.text
						})
				else:
					prev = msg.sender.all()[0]
					output.append(localStorage)

					localStorage = {
						'sender': prev.id,
						'author': prev.name + " " +prev.surname,
						'author_foto': prev.user_foto,
						'messages': [
							{
								'id': msg.id,
								'time': msg.time,
								'text': msg.text
							}
						],
					}

			output.append(localStorage)
			return Response({ 'msg_data': output })
		else:
			#пробрасываем ошибку в обратном случае
			return HttpResponseBadRequest()

class AddMessage(APIView):
	''' Позволяет добавить сообщение '''

	#curl -H "Accept: application/json" -H "Content-on/json" -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im0xNDA1NzRAZ21haWwuY29tIiwib3JpZ19pYXQiOjE1MDYyNDgwODksInVzZXJfaWQiOjIsImV4cCI6MTUzNzM1MjA4OX0.oL0Nl6Zem1qOotOoQKxp4Evr17t8aoaog5FMUSspz5g" -X POST -d '{"receiver_id": 2, "text": "Fedor"}' 127.0.0.1:8000/api/addmessage/

	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)
	
	def post(self, request, format = None):
		if request.data['receiver_id']:
			#получаем отправителя и получателя
			sender = User.objects.get(username = request.user.username)
			receiver = User.objects.get(id = request.data['receiver_id'])
			
			msg = Message()
			
			msg.text = request.data['text']
			msg.save()

			msg.sender.add(sender)
			msg.receiver.add(receiver)

			msg.save()
			return Response({'status': True})
		else:
			return HttpResponseBadRequest()

class RequestToFriend(APIView):
	'''Отправка заявки на добавления в друзья'''
	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)
	
	def post(self, request, format = None):
		if request.data['newFriend']:
			#Пользователь "меняется" данными с тем
			#кого хочет добавить в друзья
			owner = User.objects.get(username = request.user.username)
			sub = User.objects.get(id = request.data['newFriend'])

			if not(sub in owner.listOfOutcoming.all()) and not(owner in sub.listOfIncoming.all()):
				
				owner.listOfOutcoming.add(sub)
				sub.listOfIncoming.add(owner)
			
				owner.save()
				sub.save()
				
				return Response({'status': '1'})
			else :
				return HttpResponseBadRequest()

		else :
			return HttpResponseBadRequest()

class AddFriend(APIView):
	'''Принимает заявку в друзья'''
	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)

	def post(self, request, format = None):
		if request.data['addFriend']:
			#Пользователь "переносит" "друга" в список друзей
			owner = User.objects.get(username = request.user.username)
			sub = User.objects.get(id = request.data['addFriend'])

			if not(sub in owner.listOfFriends.all()) and not(owner in sub.listOfFriends.all()):
				#добавляем пользователей друг другу в список друзей
				owner.listOfFriends.add(sub)
				sub.listOfFriends.add(owner)
				#удаляем пользователей из списков ожидания ответа на заявку
				owner.listOfIncoming.remove(sub)
				sub.listOfOutcoming.remove(owner)

				owner.save()
				sub.save()
				return Response({'status': '2'})
			else:
				return HttpResponseBadRequest()	

		else :
			return HttpResponseBadRequest()

class DeleteFriend(APIView):
	'''Удаление друга из списка друзей'''
	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)

	def post(self, request, format = None):
		if request.data['delFriend']:
			owner = User.objects.get(username = request.user.username)
			sub = User.objects.get(id = request.data['delFriend'])

			if (sub in owner.listOfFriends.all()) and (owner in sub.listOfFriends.all()):
				owner.listOfFriends.remove(sub)
				sub.listOfFriends.remove(owner)
				
				owner.save()
				sub.save()
				return Response({'status': '0'})
			else:
				return HttpResponseBadRequest()
		else :
			return HttpResponseBadRequest()

class CancellationOfRequest(APIView):
	'''Отмена заявки в друзья'''
	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)

	def post(self, request, format = None):
		if request.data['cancelFriend']:
			owner = User.objects.get(username = request.user.username)
			sub = User.objects.get(id = request.data['cancelFriend'])

			if (sub in owner.listOfOutcoming.all()) and (owner in sub.listOfIncoming.all()):
				owner.listOfOutcoming.remove(sub)
				sub.listOfIncoming.remove(owner)
				
				owner.save()
				sub.save()
				return Response({'status': '0'})
			else:
				return HttpResponseBadRequest()
		else :
			return HttpResponseBadRequest()

class CancellationOfAdding(APIView):
	'''Отмена заявки со стороны sub'а '''
	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)

	def post(self, request, format = None):
		if request.data['cancelAdd']:
			owner = User.objects.get(username = request.user.username)
			sub = User.objects.get(id = request.data['cancelAdd'])

			if (sub in owner.listOfIncoming.all()) and (owner in sub.listOfOutcoming.all()):
				owner.listOfIncoming.remove(sub)
				sub.listOfOutcoming.remove(owner)

				owner.save()
				sub.save()
				return Response({'status': '0'})
			else :
				return HttpResponseBadRequest()
		else :
			return HttpResponseBadRequest()

class CheckFriends(APIView):
	'''Проверка состояния в котором пользователи находятся друг с другом, где:
		'0'- Просто не друзья
		'1'- Заявка в друзья отправлена
		'2'- Друзья
	'''
	permission_classes = (IsAuthenticated,)
	renderer_classes = (JSONRenderer,)

	def post(self, request, format = None):
		if request.data['checkFriends']:

			owner = User.objects.get(username = request.user.username)
			sub =  User.objects.get(id = request.data['checkFriends'])
			
			if not(sub in owner.listOfFriends.all()) and (sub in owner.listOfIncoming.all()):
				return Response({'status': '0'})
			else:	
				if sub in owner.listOfOutcoming.all():
					return Response({'status': '1'})
				else:
					if sub in owner.listOfFriends.all():
						return Response({'status': '2'})
					else: 
						return Response({'status': '0'})	
		else :
			return HttpResponseBadRequest()

class SaveBiography(APIView):
	permission_classes = ()
	renderer_classes = (JSONRenderer,)

	def post(self, request, format =None):
		if request.data['id']:
			
			option = User.objects.get(username = request.user.username)
			
			option.name = request.data['name']
			option.surname = request.data['surname']
			option.birthDate = request.data['birthDate']
			option.hometown = request.data['hometown']
			option.maidenName = request.data['maidenName']
			option.sex = request.data['sex']
			option.birthtown = request.data['birthtown']
			option.maritalstatus = request.data['maritalstatus']

			option.save()
			
			return Response({'status': True})
		else:
			return HttpResponseBadRequest()

class SaveIdeology(APIView):
	permission_classes = ()
	renderer_classes = (JSONRenderer,)

	def post(self, request, format =None):
		if request.data['id']:
			
			option = User.objects.get(username = request.user.username)

			option.religiousBeliefs = request.data['religiousBeliefs']
			option.politicalBeliefs = request.data['politicalBeliefs']

			option.save()

			return Response({'status': True})
		else:
			return HttpResponseBadRequest()

class Register(APIView):
	permission_classes = ()
	renderer_classes = (JSONRenderer, )

	def post(self, request, format = None):
		#добавление групп пользователя
		def addGroups(newUser, groups):
			#1 элемент отвечает за длину
			for i in range(1, len(groups)):
				try:					
					#добавляем в владельцы нашего пользователя
					vk = vkGroup.objects.get(url = groups[i]['gid'])
					vk.save()
					newUser.vk_groups.add(vk)
					newUser.save()

				except vkGroup.DoesNotExist:
					#создаем новую группу и добавляем в нее пользователя
					vk = vkGroup()
					vk.url = groups[i]['gid']
					vk.save()
					newUser.vk_groups.add(vk)
					newUser.save()

		if request.data['login'] and request.data['fname'] and request.data['sname'] and request.data['password']:
			#регистрация пользователя
			try:
				User.objects.get(username = request.data['login'])
				#если такой логин использовался
				return Response({'status': False})
			except User.DoesNotExist:
				
				#создаем дату
				try:
					request.data['birthDate']
				except KeyError:
					request.data['birthDate'] = '1.1.1970'
				
				date = request.data['birthDate'].split('.')
				date = date[2] + '-' + date[1] + '-' + date[0]
				
				#создаем пользователя и присваиваем ему значения	
				newUser = User()
				newUser.username = request.data['login']
				newUser.name = request.data['fname']
				newUser.surname = request.data['sname']
				newUser.setHometown(request.data['hometown'])
				newUser.birthDate = date
				newUser.user_foto = request.data['userFoto']
				newUser.workplace = 'None'
				newUser.vk_id = request.data['uid']
				newUser.set_password(request.data['password'])

				newUser.save()

				#обработка подписок
				groups = request.data['vk_groups']

				#добавление групп в потоке
				t = threading.Thread(target = addGroups, args = (newUser, groups, ))
				t.daemon = True
				t.start()

				return Response({'status': True})		
		else:
			return HttpResponseBadRequest()


class CheckRegistered(APIView): 
	permission_classes = ()
	renderer_classes = (JSONRenderer, )

	def post(self, request, format = None):
		if request.data['vk_id']: 
			try:
				User.objects.get(vk_id = request.data['vk_id'])
				#если мы нашли пользователя, то возвращаем False
				return Response({'status': False})
			except User.DoesNotExist:
				return Response({'status': True})
		return HttpResponseBadRequest()