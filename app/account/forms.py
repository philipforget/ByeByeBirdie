from django import forms

from .models import CustomUser



class OptOutForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('is_opted_out',)
