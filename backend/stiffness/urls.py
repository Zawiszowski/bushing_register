from django.urls import path, include
import stiffness.views as views


urlpatterns = [
    path('calculate_stiffness/', views.CalculateStiffnessMapView.as_view(), name='calculate_stiffness'),

]
