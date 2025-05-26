from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from cafefinder_api.models import DBSession, Base

def main(global_config, **settings):
    config = Configurator(settings=settings)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config.include('cafefinder_api.routes')
    config.scan('cafefinder_api.views')

    return config.make_wsgi_app()