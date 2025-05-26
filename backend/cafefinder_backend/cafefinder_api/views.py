from pyramid.view import view_config
from pyramid.response import Response
from cafefinder_api.models import DBSession
from cafefinder_api.models.models import User, Cafe
from passlib.hash import pbkdf2_sha256
import json

@view_config(route_name='home', renderer='json')
def home_view(request):
    return {'message': 'Selamat datang di CafeFinder API'}

@view_config(route_name='register', renderer='json')
def register(request):
    data = request.json_body
    if DBSession.query(User).filter_by(email=data['email']).first():
        return Response(json.dumps({'error': 'Email sudah terdaftar'}), content_type='application/json', status=400)
    user = User(
        username=data['username'],
        email=data['email'],
        password=pbkdf2_sha256.hash(data['password']),
        role='user'
    )
    DBSession.add(user)
    return {'message': 'Registrasi berhasil'}

@view_config(route_name='login', renderer='json')
def login(request):
    data = request.json_body
    user = DBSession.query(User).filter_by(email=data['email']).first()
    if user and pbkdf2_sha256.verify(data['password'], user.password):
        return {'message': 'Login berhasil', 'username': user.username, 'role': user.role}
    return Response(json.dumps({'error': 'Email atau password salah'}), content_type='application/json', status=401)

@view_config(route_name='get_cafes', renderer='json')
def get_cafes(request):
    cafes = DBSession.query(Cafe).all()
    return [{
        'id': c.id,
        'name': c.name,
        'location': c.location,
        'open_hours': c.open_hours,
        'description': c.description,
        'image': c.image,
        'rating': c.rating
    } for c in cafes]
