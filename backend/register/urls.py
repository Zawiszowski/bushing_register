from django.urls import path, include
import register.views as views
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'bushing_register', views.bushingView, 'bushing_register')
router.register(r'client', views.ClientModelView, 'client')
router.register(r'project', views.ProjectModelView, 'project')
router.register(r'mounting_component', views.MountingComponentView, 'mounting_component')

urlpatterns = [
    path('',include(router.urls)),
    path('projects/filter/', views.ProjectModelView.as_view({'get': 'filter'}), name='projects-filter'),

]
