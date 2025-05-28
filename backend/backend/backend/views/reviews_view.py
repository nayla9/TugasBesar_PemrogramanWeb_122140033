from pyramid.view import view_config
from ..models import Review, Cafe
from .auth import get_current_user, require_role
from pyramid.httpexceptions import HTTPForbidden

@view_config(route_name='review_list', renderer='json', request_method='GET')
def review_list(request):
    session = request.dbsession
    reviews = session.query(Review).all()
    return {
        'reviews': [
            {
                'id': r.id,
                'user_id': r.user_id,
                'user_name': r.user.username if r.user else None,
                'cafe_id': r.cafe_id,
                'cafe_name': r.cafe.name if r.cafe else None,
                'rating': r.rating,
                'comment': r.comment,
                'created_at': r.created_at.isoformat() if r.created_at else None
            } for r in reviews
        ]
    }

@view_config(route_name='review_create', renderer='json', request_method='POST')
def review_create(request):
    user = get_current_user(request)
    if not user:
        return HTTPForbidden("Anda harus login untuk membuat review")

    session = request.dbsession
    data = request.json_body

    cafe_id = data.get('cafe_id')
    rating = data.get('rating')

    if not cafe_id or rating is None:
        request.response.status = 400
        return {'status': 'error', 'message': 'cafe_id dan rating harus diisi'}

    cafe = session.query(Cafe).filter_by(id=cafe_id).first()
    if not cafe:
        request.response.status = 404
        return {'status': 'error', 'message': 'Cafe tidak ditemukan'}

    review = Review(
        user_id=user.id,
        cafe_id=cafe_id,
        rating=rating,
        comment=data.get('comment')
    )
    session.add(review)
    session.flush()
    return {'status': 'success', 'message': 'Review berhasil ditambahkan', 'id': review.id}

@view_config(route_name='review_update', renderer='json', request_method='PUT')
def review_update(request):
    user = get_current_user(request)
    if not user:
        return HTTPForbidden("Anda harus login untuk mengubah review")

    session = request.dbsession
    review_id = request.matchdict.get('id')
    review = session.query(Review).filter_by(id=review_id).first()
    if not review:
        request.response.status = 404
        return {'status': 'error', 'message': 'Review tidak ditemukan'}

    # Cek apakah user adalah admin atau pemilik review
    if user.role != 'admin' and review.user_id != user.id:
        return HTTPForbidden("Anda tidak memiliki izin untuk mengubah review ini")

    data = request.json_body
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    session.flush()
    return {'status': 'success', 'message': 'Review berhasil diperbarui'}

@view_config(route_name='review_delete', renderer='json', request_method='DELETE')
def review_delete(request):
    user = get_current_user(request)
    if not user:
        return HTTPForbidden("Anda harus login untuk menghapus review")

    session = request.dbsession
    review_id = request.matchdict.get('id')
    review = session.query(Review).filter_by(id=review_id).first()
    if not review:
        request.response.status = 404
        return {'status': 'error', 'message': 'Review tidak ditemukan'}

    # Cek apakah user adalah admin atau pemilik review
    if user.role != 'admin' and review.user_id != user.id:
        return HTTPForbidden("Anda tidak memiliki izin untuk menghapus review ini")

    session.delete(review)
    session.flush()
    return {'status': 'success', 'message': 'Review berhasil dihapus'}