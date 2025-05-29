from . import users_view
from pyramid.response import Response
from pyramid.view import view_config

# Handler OPTIONS universal untuk semua route
@view_config(route_name='home', request_method='OPTIONS')
@view_config(route_name='register', request_method='OPTIONS')
@view_config(route_name='login', request_method='OPTIONS')
@view_config(route_name='get_user', request_method='OPTIONS')

@view_config(route_name='cafe_list', request_method='OPTIONS')
@view_config(route_name='cafe_create', request_method='OPTIONS')
@view_config(route_name='cafe_update', request_method='OPTIONS')
@view_config(route_name='cafe_delete', request_method='OPTIONS')

@view_config(route_name='review_list', request_method='OPTIONS')
@view_config(route_name='review_create', request_method='OPTIONS')
@view_config(route_name='review_update', request_method='OPTIONS')
@view_config(route_name='review_delete', request_method='OPTIONS')
def options_handler(request):
    return Response(status=200)