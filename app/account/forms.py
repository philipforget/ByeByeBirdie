from django import forms

class OptOutForm(forms.Form):
    opt_out = forms.BooleanField(required=False)
