from datetime import date, timedelta
import calendar
import pandas_market_calendars as mcal
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Trade
from decimal import Decimal


@api_view(['GET'])
def heatmap_current_month(request):
    today = date.today()
    year = today.year
    month = today.month

    # First and last day of the month
    first = date(year, month, 1)
    last = date(year, month, calendar.monthrange(year, month)[1])

    # List all days in the month
    days = [first + timedelta(days=i) for i in range((last - first).days + 1)]

    # Trading calendar
    nyse = mcal.get_calendar("NYSE")
    trading_days = nyse.valid_days(start_date=first, end_date=last)
    trading_days_str = set(day.strftime("%Y-%m-%d") for day in trading_days)

    # Fetch trades in this month
    trades = Trade.objects.filter(date__range=(first, last))

    # Aggregate PnL and % per day
    pnl_per_day = {}
    pct_per_day = {}

    for trade in trades:
        if trade.net_profit_loss is not None:
            pnl_per_day.setdefault(trade.date, Decimal("0"))
            pnl_per_day[trade.date] += trade.net_profit_loss

            invested = trade.buy * trade.amount
            if invested > 0:
                pct_per_day.setdefault(trade.date, {"profit": Decimal("0"), "capital": Decimal("0")})
                pct_per_day[trade.date]["profit"] += trade.gross_profit_loss
                pct_per_day[trade.date]["capital"] += invested

    # Build day-by-day response
    data = []
    for day in days:
        date_str = day.strftime("%Y-%m-%d")
        pnl = pnl_per_day.get(day)
        pct_info = pct_per_day.get(day)

        if pct_info and pct_info["capital"] > 0:
            pnl_pct = float(pct_info["profit"] / pct_info["capital"] * 100)
        else:
            pnl_pct = None

        data.append({
            "date": date_str,
            "is_trading_day": date_str in trading_days_str,
            "pnl": float(pnl) if pnl is not None else None,
            "pnl_pct": pnl_pct
        })

    return Response({
        "year": year,
        "month": month,
        "days": data,
    })
