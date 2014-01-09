
var routes = {
  '/': '/templates/views/site/index.html',
  '/users': '/templates/views/site/users/create.html',
  '/signin': '/templates/views/app/index.html',
  '/account/settings': '/templates/views/app/users/edit.html',
  '/account/delete': '/templates/views/app/users/delete.html',
  '/reset_password': '/templates/views/site/users/reset_password.html',
  '/reset_password_verification': '/templates/views/site/users/reset_password_verification.html',
  '/projects': {
    'GET': '/templates/views/app/projects/index.html',
    'POST': {
      location: '/projects/2/edit'
    }
  },
  '/projects/2/edit': '/templates/views/app/projects/edit-no-media-items.html',
  '/projects/2/edit/with-media-items': '/templates/views/app/projects/edit-with-media-items.html',
  '/media-library': '/templates/views/app/media-library/index.html',
  '/media-library-with-items': {
    template: '/views/app/media-library/index.jade',
    data: {
      mediaItems: [
        {
          id: 1,
          thumbnail: 'http://placehold.it/140x100',
          title: 'Media item 1',
          creationDate: '28/12/2013',
          projects: [],
          duration: '4m28s'
        },
        {
          id: 2,
          thumbnail: 'http://placehold.it/140x100/000000',
          title: 'Media item 2',
          creationDate: '17/09/2012',
          projects: [
            'Client Engagement',
            'Promotion Demo'
          ],
          duration: '2m7s'
        },
        {
          id: 3,
          thumbnail: 'http://placehold.it/140x100/00ffff',
          title: 'Media item 3',
          creationDate: '06/03/2012',
          projects: [
            'Blooper reel',
            'Another project',
            'Business update'
          ],
          duration: '54m19s'
        }
      ]
    }
  }
};

module.exports = routes;
