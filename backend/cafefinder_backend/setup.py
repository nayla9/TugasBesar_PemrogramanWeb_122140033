from setuptools import setup, find_packages

setup(
    name='cafefinder_backend',
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'pyramid',
        'waitress',
        'sqlalchemy',
        'psycopg2-binary',
        'alembic',
        'passlib',
        'pyramid_jinja2',
        'pyramid_debugtoolbar',
        'zope.sqlalchemy',
        'transaction',
        'pyramid_tm',
        'pyramid_retry',
    ],
    entry_points={
        'paste.app_factory': [
            'main = cafefinder_backend:main',
        ],
    },
)
