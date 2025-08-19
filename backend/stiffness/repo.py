from django.db.models import Max
from register.models import BushingRegister
from datetime import datetime, timezone

class RegisterRepo:
    def max_updated_at(self) -> datetime | None:
        row = BushingRegister.objects.aggregate(m=Max("updated_at"))
        return row["m"].astimezone(timezone.utc) if row["m"] else None