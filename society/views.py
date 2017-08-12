from django.views.generic import TemplateView

# 

class Index(TemplateView):
	#при любых "вопросах выводить index.html"
	template_name = 'society/index/index.html'
