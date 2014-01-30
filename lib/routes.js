
var routes = {
  '/': '/templates/views/pages.html',
  '/home': '/templates/views/site/index.html',
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
  '/projects/2/edit': '/templates/views/app/projects/edit.html',
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
          projectIDs: '',
          duration: '4m28s'
        },
        {
          id: 2,
          thumbnail: 'http://placehold.it/140x100/000000',
          title: 'Media item 2',
          creationDate: '17/09/2012',
          projects: [
            {
              id: 875,
              title: 'Client Engagement'
            },
            {
              id: 957,
              title: 'Promotion Demo'
            }
          ],
          projectIDs: '875,957',
          duration: '2m7s'
        },
        {
          id: 3,
          thumbnail: 'http://placehold.it/140x100/00ffff',
          title: 'Media item 3',
          creationDate: '06/03/2012',
          projects: [
            {
              id: 456,
              title: 'Blooper reel'
            },
            {
              id: 877,
              title: 'Another project'
            },
            {
              id: 966,
              title: 'Business update'
            }
          ],
          projectIDs: '456,877,966',
          duration: '54m19s'
        }
      ]
    }
  },
  '/add-media/1': '/templates/views/app/add-media-item/index.html'
};

module.exports = routes;
