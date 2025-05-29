import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory
from pyramid.events import NewResponse
from pyramid.events import subscriber
from utils.security import hash_password, verify_password


@subscriber(NewResponse)
def add_cors_headers(event):
    response = event.response
    response.headers.update({
        'Access-Control-Allow-Origin': '*',  # Ganti '*' dengan origin frontend kalau mau lebih aman
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    secret_key = 'borahea.v'
    my_session_factory = SignedCookieSessionFactory(secret_key)

    with Configurator(settings=settings) as config:
        config.set_session_factory(my_session_factory)
        config.add_static_view('static', 'backend:static')
        config.include('pyramid_jinja2')

        # Tambahkan subscriber CORS di sini
        config.add_subscriber(add_cors_headers, NewResponse)

        config.include('.models')
        config.include('.routes')
        config.scan()
    return config.make_wsgi_app()
