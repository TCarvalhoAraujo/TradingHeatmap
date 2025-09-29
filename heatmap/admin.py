from django.contrib import admin

# Register your models here.
class TradeAdmin(admin.ModelAdmin):
    list_display = ("ticker", "date", "buy", "sell", "gross_profit_loss", "net_profit_loss")
    search_fields = ("ticker",)