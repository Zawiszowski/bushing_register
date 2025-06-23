from rest_framework import filters

from rest_framework import filters
from django.db import models

class CustomSearchFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        decommissioned_param = request.query_params.get('decommissioned', None)
        custom_pn_param = request.query_params.get('custom_pn', None)
        search_param = request.query_params.get('search', None)
        
        if decommissioned_param:
            if decommissioned_param == 'true' or decommissioned_param == 'True':
                 decommissioned_param = True
            else:
                 decommissioned_param = False
            queryset = queryset.filter(decommissioned=decommissioned_param)
        if custom_pn_param:
            queryset = queryset.filter(custom_pn=custom_pn_param)
        if search_param:
            if custom_pn_param:
                queryset = queryset.filter(
                    models.Q(client_pn__icontains=search_param) |
                    models.Q(storage_locker__icontains=search_param) |
                    models.Q(created_at__icontains=search_param)
                )
            else:
                    queryset = queryset.filter(
                    models.Q(client_pn__icontains=search_param) |
                    models.Q(storage_locker__icontains=search_param) |
                    models.Q(created_at__icontains=search_param) |
                    models.Q(custom_pn__icontains=search_param)
                )

        return queryset
