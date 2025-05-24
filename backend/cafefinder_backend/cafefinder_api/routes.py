def includeme(config):
    config.add_route('home', '/')
    config.add_route('get_users', '/api/users')

    config.add_route('get_cafes', '/api/cafes')

    config.add_route('add_cafe', '/cafes', request_method='POST')
    config.add_route('edit_cafe', '/cafes/{id}', request_method='PUT')
    config.add_route('delete_cafe', '/cafes/{id}', request_method='DELETE')

    config.add_route('get_reviews', '/cafes/{id}/reviews')
    config.add_route('add_review', '/cafes/{id}/reviews', request_method='POST')

    config.add_route('register', '/auth/register', request_method='POST')
    config.add_route('login', '/auth/login', request_method='POST')
