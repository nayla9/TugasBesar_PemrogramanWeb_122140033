from pyramid.httpexceptions import HTTPForbidden
from ..models import User

def get_current_user(request):
    """
    Mengambil user dari session, jika ada.
    """
    user_id = request.session.get('user_id')
    if user_id:
        return request.dbsession.query(User).filter_by(id=user_id).first()
    return None

def require_role(role):
    """
    Dekorator untuk membatasi akses hanya ke user dengan peran tertentu.
    """
    def decorator(view):
        def wrapped_view(request):
            user = get_current_user(request)
            if not user or user.role != role:
                raise HTTPForbidden(f"Access denied, requires role '{role}'")
            return view(request)
        return wrapped_view
    return decorator