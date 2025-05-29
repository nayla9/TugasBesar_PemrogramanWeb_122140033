def includeme(config):
    config.add_route('home', '/')  # tambahkan route home

    config.add_route('register', '/auth/register')
    config.add_route('login', '/auth/login')
    config.add_route('get_user', '/auth/user/{id}')


    # Cafe routes
    config.add_route('cafe_list', '/cafes')
    config.add_route('cafe_create', '/cafes/create')
    config.add_route('cafe_update', '/cafes/update/{id}')
    config.add_route('cafe_delete', '/cafes/delete/{id}')

    # Review routes
    config.add_route('review_list', '/reviews')
    config.add_route('review_create', '/reviews/create')
    config.add_route('review_update', '/reviews/update/{id}')
    config.add_route('review_delete', '/reviews/delete/{id}')