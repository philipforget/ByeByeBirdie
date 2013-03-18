ByeByeBirdie
============

Setup
-----
```bash
# First, clone the repo and cd into it
git clone git@github.com:arc90/ByeByeBirdie.git && cd ByeByeBirdie

# Install and update your pip and virtualenvs if you have to
sudo easy_install pip && sudo pip install virtualenvwrapper

# Create a virtualenv
mkvirtualenv --distribute bbb

# You'll see your prompt is now prepended with (bbb)
# Add the app path to your python path by running
add2virtualenv ./app

# To keep from having to type --settings=settings.local you can create a
# virtualenv hook to set it for you
echo 'export DJANGO_SETTINGS_MODULE=settings.local' >> "$WORKON_HOME/bbb/bin/postactivate"
echo 'unset DJANGO_SETTINGS_MODULE' >> "$WORKON_HOME/bbb/bin/postdeactivate"

# Reactivate your virtualenv to take advantage of the hooks
deactivate && workon bbb

# Install your python requirements
pip install -r requirements.txt

# Sync the DB for the first time
django-admin.py  syncdb

# Run migrations (celery/DSA)
django-admin.py migrate
```
