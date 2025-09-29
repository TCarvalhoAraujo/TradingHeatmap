from django.db import models

TAX_RATE = 0.15

# Create your models here.
class Trade(models.Model):
    ticker = models.CharField(max_length=10)
    date = models.DateField()

    buy = models.DecimalField(max_digits=10, decimal_places=2)
    sell = models.DecimalField(max_digits=10, decimal_places=2)
    fees = models.DecimalField(max_digits=5, decimal_places=2)
    amount = models.PositiveBigIntegerField()

    notes = models.TextField(blank=True)
    files = models.FileField(upload_to="tax_files/", blank=True)

    @property
    def gross_profit_loss(self):
        """Profit before taxes"""
        if not self.sell:
            return None
        return (self.sell - self.buy) * self.amount - self.fees
    
    @property
    def net_profit_loss(self):
        """Profit after 15% tax"""
        gross = self.gross_profit_loss
        if gross is None:
            return None
        return gross * (1 - TAX_RATE) if gross > 0 else gross
    
    @property
    def profit_loss_pct(self):
        """Percentage return based on buy price"""
        if not self.buy:
            return None
        gross = (self.sell - self.buy - self.fees) / self.buy * 100
        return gross * (1 - TAX_RATE) if gross > 0 else gross