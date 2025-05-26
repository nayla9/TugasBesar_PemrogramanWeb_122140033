from cafefinder_api.models import Base
from cafefinder_api.__init__ import DBSession
from sqlalchemy.engine import engine_from_config

settings = {
    'sqlalchemy.url': 'postgresql://postgres:password@localhost:5432/cafefinder'
}

engine = engine_from_config(settings, 'sqlalchemy.')
DBSession.configure(bind=engine)
Base.metadata.create_all(bind=engine)
print("Semua tabel berhasil dibuat")