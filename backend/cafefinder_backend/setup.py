import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'plaster_pastedeploy',
    'pyramid=>2.0',
    'pyramid_jinja2>=2.7',
    'pyramid_debugtoolbar',
    'waitress>=2.1',
    'alembic',
    'pyramid_retry',
    'pyramid_tm',
    'SQLAlchemy>=1.4',
    'transaction',
    'zope.sqlalchemy',
]

tests_require = [
    'WebTest',
    'pytest',
    'pytest-cov',
]

setup(
    name='cafefinder_backend',
    version='1.0.0',
    description='cafefinder_backend',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='nayla',
    author_email='naylafk1235@gmail.com',
    url='https://github.com/nayla9/TugasBesar_PemrogramanWeb_122140033',
    keywords='web pyramid pylons',
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    zip_safe=False,
    extras_require={
        'testing': tests_require,
    },
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = cafefinder_api.__init__:main',
        ],
        'console_scripts': [
            'initialize_cafefinder_backend_db=cafefinder_backend.scripts.initialize_db:main',
        ],
    },
)
