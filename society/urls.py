from django.conf.urls import url
from django.views.generic import TemplateView
from .views import Index

urlpatterns = [
	url(r'^', Index.as_view()),
]