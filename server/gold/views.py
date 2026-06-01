from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services import get_kozhikode_gold_rate


class KeralaGoldRateView(APIView):
    def get(self, request):
        try:
            data = get_kozhikode_gold_rate()
            return Response(data)
        except Exception as exc:
            return Response(
                {
                    'error': 'Unable to fetch current gold rate',
                    'details': str(exc),
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )
