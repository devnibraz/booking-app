from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user),
    path('login/', views.login_user),
    # path('me/', views.current_user),
    path('booking/list/', views.booking_list),
    path('booking/new/', views.booking_new),
    path('booking/edit/<int:id>/', views.booking_edit),
    path('booking/delete/<int:id>/', views.booking_delete),
]
