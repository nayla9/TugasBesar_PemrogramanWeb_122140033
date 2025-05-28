from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, configure_mappers
import zope.sqlalchemy

# Import semua model supaya Base.metadata lengkap dan configure_mappers berjalan lancar
from .users import User
from .cafe import Cafe
from .reviews import Review

from utils.security import hash_password, verify_password

# Kalau ada model lain, import juga di sini
# from .mymodel import MyModel  # contoh import model lain
from .mymodel import MyModel
# Pastikan semua mapper selesai di konfigurasi agar relasi berjalan
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    """
    Membuat SQLAlchemy engine dari konfigurasi .ini file
    """
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    """
    Membuat session factory yang terikat dengan engine
    """
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Membuat session yang terintegrasi dengan transaction manager Pyramid,
    agar session bisa di-commit atau di-rollback otomatis oleh pyramid_tm.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Fungsi konfigurasi yang akan dipanggil oleh Pyramid saat
    `config.include('backend.models')`

    Fungsi ini menginisialisasi session factory dan menambahkan
    request.dbsession agar bisa dipakai di view dengan mudah.
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    # Include modul pyramid_tm dan pyramid_retry untuk manajemen transaksi dan retry otomatis
    config.include('pyramid_tm')
    config.include('pyramid_retry')

    # Buat session factory berdasarkan engine yang diambil dari settings
    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    # Tambahkan dbsession ke objek request agar bisa diakses dengan request.dbsession
    config.add_request_method(
        # Menggunakan r.tm (transaction manager) dari pyramid_tm
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True
    )
