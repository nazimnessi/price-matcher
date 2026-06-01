from django.urls import path
from .views import KeralaGoldRateView

urlpatterns = [
    path('kozhikode/', KeralaGoldRateView.as_view(), name='kozhikode_gold_rate'),
]
