from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from .models import DBSession, Cafe, Review, User
from passlib.hash import pbkdf2_sha256
import json

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
    return [
        {
            'id': c.id,
            'name': c.name,
            'location': c.location,
            'open_hours': c.open_hours,
            'description': c.description,
            'image': c.image,
            'rating': c.rating
        } for c in cafes
    ]

@view_config(route_name='add_cafe', renderer='json')
def add_cafe(request):
    data = request.json_body
    cafe = Cafe(**data)
    DBSession.add(cafe)
    return {'message': 'Cafe ditambahkan', 'id': cafe.id}

@view_config(route_name='edit_cafe', renderer='json')
def edit_cafe(request):
    cafe = DBSession.query(Cafe).get(int(request.matchdict['id']))
    if not cafe:
        return Response(json.dumps({'error': 'Cafe tidak ditemukan'}), content_type='application/json', status=404)
    data = request.json_body
    for key, value in data.items():
        setattr(cafe, key, value)
    return {'message': 'Cafe diperbarui'}

@view_config(route_name='delete_cafe', renderer='json')
def delete_cafe(request):
    cafe = DBSession.query(Cafe).get(int(request.matchdict['id']))
    if not cafe:
        return Response(json.dumps({'error': 'Cafe tidak ditemukan'}), content_type='application/json', status=404)
    DBSession.delete(cafe)
    return {'message': 'Cafe dihapus'}

@view_config(route_name='get_reviews', renderer='json')
def get_reviews(request):
    reviews = DBSession.query(Review).filter_by(cafe_id=int(request.matchdict['id'])).all()
    return [
        {
            'id': r.id,
            'username': r.username,
            'comment': r.comment,
            'rating': r.rating
        } for r in reviews
    ]

@view_config(route_name='add_review', renderer='json')
def add_review(request):
    data = request.json_body
    review = Review(
        cafe_id=int(request.matchdict['id']),
        username=data['username'],
        comment=data['comment'],
        rating=data['rating']
    )
    DBSession.add(review)
    return {'message': 'Review ditambahkan'}