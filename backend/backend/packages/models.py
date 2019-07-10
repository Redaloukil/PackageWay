from django.conf import settings
from django.db import models
from backend.general.models import BaseModel

WILAYAS = (
    ()
)

REGIONS = (
    ("0" , "Oran"),
    ("1" , "Mostaganem"),
    
)

TYPES = (
    ("0" , "Food"),
    ("1" , "Clothes"),
    ("2" , "Other")
)

class Package(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE )
    content = models.CharField(max_length=255 ,blank=False)
    content_type = models.CharField(max_length=50 ,choices=TYPES)
    recovered = models.BooleanField(default=False, blank=False)
    arrived = models.BooleanField(default=False , blank=False)
    from_wilaya = models.CharField(max_length=255 , choices=WILAYAS ,default="0")
    from_address = models.CharField(max_length=255,default="53 ,cité les castors ,Es-sénia ,Oran", blank=False)
    

    class Meta:
        default_related_name = 'packages'

    def __str__(self):
        return self.user 
