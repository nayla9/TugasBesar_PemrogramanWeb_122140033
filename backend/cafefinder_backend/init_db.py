from sqlalchemy import engine_from_config
from cafefinder_api.models import DBSession, Base
from cafefinder_api.models.models import Cafe, User
import transaction
from configparser import ConfigParser

config = ConfigParser()
config.read('development.ini')
settings = dict(config['app:main'])
engine = engine_from_config(settings, 'sqlalchemy.')
DBSession.configure(bind=engine)
Base.metadata.create_all(engine)

with transaction.manager:
    cafe1 = Cafe(name="Kopi Kita", location="Bandar Lampung", open_hours="08:00 - 22:00",
                 description="Kafe dengan suasana cozy", image="kopikita.jpg", rating=4.5)
    DBSession.add(cafe1)

print("Database initialized with dummy cafe.")