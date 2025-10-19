from django.db import models
from django.contrib.auth.models import User

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    detail = models.TextField(blank=True)
    day_of_booking = models.DateField()
    price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title} - {self.day_of_booking}"
