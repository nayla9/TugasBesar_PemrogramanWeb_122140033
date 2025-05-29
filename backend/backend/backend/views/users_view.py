from pyramid.view import view_config
from ..models import User
from passlib.hash import bcrypt
from sqlalchemy.exc import SQLAlchemyError
from .auth import require_role
from ..utils.security import hash_password, verify_password

@view_config(route_name="register", renderer="json", request_method="POST")
def register_user(request):
    session = request.dbsession
    data = request.json_body

    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "user").lower()

    if not email or not username or not password:
        request.response.status = 400
        return {"status": "error", "message": "Email, username dan password wajib diisi"}

    if role not in ("user", "admin"):
        role = "user"

    # Cek apakah email atau username sudah dipakai
    existing_user = session.query(User).filter(
        (User.email == email) | (User.username == username)
    ).first()
    if existing_user:
        request.response.status = 409
        return {"status": "error", "message": "Email atau username sudah digunakan"}

    try:
        hashed_password = hash_password(password)
        new_user = User(email=email, username=username, password=hashed_password, role=role)
        session.add(new_user)
        session.flush()

        request.response.status = 201
        return {
            "status": "success",
            "message": "User berhasil didaftarkan",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "username": new_user.username,
                "role": new_user.role,
            },
        }
    except SQLAlchemyError as e:
        request.response.status = 500
        return {"status": "error", "message": str(e)}

@view_config(route_name="login", renderer="json", request_method="POST")
def login(request):
    session = request.dbsession
    data = request.json_body

    identity = data.get("identity")
    password = data.get("password")

    if not identity or not password:
        request.response.status = 400
        return {"status": "error", "message": "Email/username dan password wajib diisi"}

    user = session.query(User).filter(
        (User.email == identity) | (User.username == identity)
    ).first()

    if not user:
        request.response.status = 404
        return {"status": "error", "message": "User tidak ditemukan"}

    if not verify_password(password, user.password):
        request.response.status = 401
        return {"status": "error", "message": "Password salah"}
    
    request.session['user_id'] = user.id
    request.session['role'] = user.role

    return {
        "status": "success",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role,
        },
    }

@view_config(route_name="get_user", renderer="json", request_method="GET")
def get_user(request):
    session = request.dbsession
    user_id = request.matchdict.get("id")

    if not user_id:
        request.response.status = 400
        return {"status": "error", "message": "User ID tidak diberikan"}

    user = session.query(User).filter_by(id=user_id).first()

    if not user:
        request.response.status = 404
        return {"status": "error", "message": "User tidak ditemukan"}

    return {
        "status": "success",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role,
        },
    }
