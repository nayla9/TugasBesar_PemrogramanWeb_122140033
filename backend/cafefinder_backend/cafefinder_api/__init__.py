from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session
from cafefinder_api.models import Base

DBSession = scoped_session(sessionmaker())

def main(global_config, **settings):
    config = Configurator(settings=settings)

    # Setup database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config.add_request_method(lambda r: DBSession, 'dbsession', reify=True)

     # Register routes dan views secara eksplisit
    from cafefinder_api import routes
    from cafefinder_api import views
    
    config.include(routes.includeme)
    config.scan('cafefinder_api.views')
    return config.make_wsgi_app()