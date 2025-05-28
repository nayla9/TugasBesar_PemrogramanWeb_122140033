from pyramid.view import view_config
from ..models import Cafe
from .auth import get_current_user

# Middleware fungsi untuk mengecek admin
def require_admin(request):
    user = get_current_user(request)
    if not user or user.role != 'admin':
        request.response.status = 403
        return {'error': 'Forbidden: admin only'}
    return None

# GET /cafes — publik
@view_config(route_name='cafe_list', renderer='json', request_method='GET')
def cafe_list(request):
    session = request.dbsession
    cafes = session.query(Cafe).all()
    return {
        'cafes': [
            {
                'id': cafe.id,
                'name': cafe.name,
                'location': cafe.location,
                'open_hours': cafe.open_hours,
                'description': cafe.description,
                'image': cafe.image,
                'rating': cafe.rating
            } for cafe in cafes
        ]
    }

# POST /cafes — hanya admin
@view_config(route_name='cafe_create', renderer='json', request_method='POST')
def cafe_create(request):
    admin_check = require_admin(request)
    if admin_check:
        return admin_check

    session = request.dbsession
    data = request.json_body
    cafe = Cafe(
        name=data.get('name'),
        location=data.get('location'),
        open_hours=data.get('open_hours'),
        description=data.get('description'),
        image=data.get('image'),
        rating=data.get('rating', 0)
    )
    session.add(cafe)
    session.flush()
    return {'status': 'success', 'message': 'Cafe berhasil ditambahkan', 'id': cafe.id}

# PUT /cafes/{id} — hanya admin
@view_config(route_name='cafe_update', renderer='json', request_method='PUT')
def cafe_update(request):
    admin_check = require_admin(request)
    if admin_check:
        return admin_check

    session = request.dbsession
    cafe_id = request.matchdict.get('id')
    cafe = session.query(Cafe).filter_by(id=cafe_id).first()
    if not cafe:
        request.response.status = 404
        return {'error': 'Cafe tidak ditemukan'}

    data = request.json_body
    cafe.name = data.get('name', cafe.name)
    cafe.location = data.get('location', cafe.location)
    cafe.open_hours = data.get('open_hours', cafe.open_hours)
    cafe.description = data.get('description', cafe.description)
    cafe.image = data.get('image', cafe.image)
    cafe.rating = data.get('rating', cafe.rating)
    session.flush()
    return {'status': 'success', 'message': 'Cafe berhasil diperbarui'}

# DELETE /cafes/{id} — hanya admin
@view_config(route_name='cafe_delete', renderer='json', request_method='DELETE')
def cafe_delete(request):
    admin_check = require_admin(request)
    if admin_check:
        return admin_check

    session = request.dbsession
    cafe_id = request.matchdict.get('id')
    cafe = session.query(Cafe).filter_by(id=cafe_id).first()
    if not cafe:
        request.response.status = 404
        return {'error': 'Cafe tidak ditemukan'}

    session.delete(cafe)
    session.flush()
    return {'status': 'success', 'message': 'Cafe berhasil dihapus'}