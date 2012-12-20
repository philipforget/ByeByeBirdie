from django import forms

from .models import Unfollow


class UnfollowForm(forms.ModelForm):
    class Meta:
        model = Unfollow
        fields = ('message', 'user', 'unfollowed_by')

    def clean_message(self):
        if len(self.cleaned_data['message']) > 500:
            raise forms.ValidationError(
                "Message cannot exceed 500 characters")

        return self.cleaned_data['message']
