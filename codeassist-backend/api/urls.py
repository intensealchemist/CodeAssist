from django.urls import path
from .views import get_response,LoginView,RegisterView
from .views import code_review,explain_code,translate_code

urlpatterns = [
    path('get_response/', get_response, name='get-response'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('code-review/', code_review, name='code-review'),
    path('api/explain-code/', explain_code, name='explain-code'),
     path('api/translate-code/', translate_code, name='translate-code'),

]
