from django.urls import path, include
import stiffness.views as views


urlpatterns = [
    path('calculate_stiffness/', views.calculateStiffnessView.as_view(), name='calculate_stiffness'),

]
