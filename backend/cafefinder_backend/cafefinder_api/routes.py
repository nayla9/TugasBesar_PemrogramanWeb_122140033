def includeme(config):
    config.add_route('get_cafes', '/cafes')
    config.add_route('register', '/auth/register', request_method='POST')
    config.add_route('login', '/auth/login', request_method='POST')