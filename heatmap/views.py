from django.shortcuts import render
from .models import Trade

# Create your views here.
def trade_list(request):
    trades = Trade.objects.all()
    return render(request, "trades/trade_list.html", {trades: trades})