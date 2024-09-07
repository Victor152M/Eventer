from functools import wraps
from flask import flash, session, redirect, url_for

#login wrapper
def login_required(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if "logged_in" in session:
            return func(*args, **kwargs)
        else:
            flash("You need to login first")
            return redirect(url_for("login"))
    return wrap

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {"png", "jpg", "jpeg", "webp"}
