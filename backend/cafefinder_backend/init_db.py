from sqlalchemy import engine_from_config
from cafefinder_backend.models import Base, DBSession

settings = {
    'sqlalchemy.url': 'postgresql://postgres:nana123123@localhost:5432/cafefinder'
}

engine = engine_from_config(settings, 'sqlalchemy.')
DBSession.configure(bind=engine)
print(Base.metadata.tables)
Base.metadata.create_all(bind=engine)
print("tabel berhasil dibuat")
