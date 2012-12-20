from annoying.decorators import render_to
from django.contrib.auth.decorators import login_required

from .forms import OptOutForm



@login_required
@render_to('opt_out.html')
def opt_out(request):
    if request.method == 'POST':
        form = OptOutForm(request.POST)

        if form.is_valid():
            print form.cleaned_data

    else:
        form = OptOutForm()

    return {
        'form': form
    }
