from setuptools import setup, find_packages

requires = [
    'pyramid',
    'waitress',
    'sqlalchemy',
    'psycopg2-binary',
    'passlib',
    'pyramid_jinja2'
]

setup(
    name='cafefinder_backend',
    version='1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = cafefinder_api.__init__:main'
        ]
    },
)