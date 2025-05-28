from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    secret_key = 'borahea.v'
    my_session_factory = SignedCookieSessionFactory(secret_key)

    with Configurator(settings=settings) as config:
        config.set_session_factory(my_session_factory)
        config.add_static_view('static', 'backend:static')
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        config.scan()
    return config.make_wsgi_app()