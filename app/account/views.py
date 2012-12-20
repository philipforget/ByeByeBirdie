from annoying.decorators import render_to
from django import http
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse

from .forms import OptOutForm



@login_required
@render_to('opt_out.html')
def opt_out(request):
    if request.method == 'POST':
        form = OptOutForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return http.HttpResponseRedirect(
                reverse('opt-out'))

    else:
        form = OptOutForm(instance=request.user)

    return {
        'form': form
    }
