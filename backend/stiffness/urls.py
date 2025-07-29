from django.urls import path, include
import stiffness.views as views


urlpatterns = [
    path('calculate_stiffness/', views.CalculateStiffnessMapView.as_view(), name='calculate_stiffness'),
    path('estimate_shear_modulus/', views.EstimateShearModulus.as_view(), name='estimate_shear_modulus'),
]
