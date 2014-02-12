
var routes = {
  '/test': '/templates/test.html',
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
  '/projects/2/edit': {
    template: '/views/app/projects/edit.jade',
    data: {
      settings: true,
      project: {
        id: 2,
        created_at_time: '13:56',
        created_at_date: '23/12/13'
      },
      media: false
    }
  },
  '/projects/2/edit-with-items': {
    template: '/views/app/projects/edit.jade',
    data: {
      settings: true,
      project: {
        id: 2,
        title: 'A test project',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut ullamcorper nisi. Suspendisse potenti. Vivamus volutpat mi urna. Praesent enim quam, dapibus vitae felis at, varius tincidunt neque. Integer fringilla tortor eget elit ultrices, et pellentesque velit tristique.',
        created_at_time: '13:56',
        created_at_date: '23/12/13'
      },
      media: [
        {
          id: 1,
          title: 'A test title',
          description: 'A description for a test media item.',
          file: "/test-video/playlist.m3u8",
          image: "http://peach.blender.org/wp-content/uploads/bird1.jpg",
          files: [
            {
              "asset": "video",
              "spec": "original",
              "mime": "video/mov",
              "url": "http://s3bucket.com/path/to/file",
              "original_filename": "examplevideo.mp4",
              "state": "complete",  // new, processing, complete, failed
              "checksum": "a7b6f613b4e9ffa47669a5aaca40e6d4"
            },
            {
              "asset": "thumbnail",
              "spec": "generated",
              "mime": "image/jpg",
              "url": "http://peach.blender.org/wp-content/uploads/bird1.jpg",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            },
            {
              "asset": "video",
              "spec": "generated",
              "mime": "video/m3u8",
              "url": "/test-video/playlist.m3u8",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            }
          ],
          speakers: [
            {
              "id": 123,
              "title": "example speaker name",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "image",
                  "spec": "original",
                  "mime": "image/png",
                  "url": "http://www.tottenhamhotspur.com/uploadedImages/Shared_Assets/Images/News_images/SEASON_13-14/July_2013/paulinho730v.jpg?n=5537&targetTypeID=HighResNewsImage",
                  "original_filename": "test-image.jpg"
                }
              ]
            }
          ],
          attachments: [
            {
              "id": 123,
              "title": "example attachment title",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "pdf",
                  "url": "http://s3bucket/path/to/attachment.pdf",
                  "original_filename": "test-pdf.pdf"
                }
              ]
            },
            {
              "id": 124,
              "title": "another attachment title",
              "description": "lots of description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "doc",
                  "url": "http://s3bucket/path/to/attachment2.pdf",
                  "original_filename": "test-pdf2.pdf"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: 'A really really really really really really really long title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Phasellus semper sem id tellus porta interdum. Etiam vitae blandit ante, sit amet dictum mauris. Praesent elit est, vehicula ac leo vitae, scelerisque mollis ante. Fusce et urna rutrum, ultrices augue a, consectetur libero. Aliquam at quam turpis. Donec augue tellus, elementum quis mi et, semper molestie tortor. Suspendisse potenti. Curabitur eget dui imperdiet, gravida nulla eu, condimentum diam. Quisque convallis nibh felis, in ullamcorper odio suscipit id. Cras ut odio vel nunc tincidunt rutrum. Sed tincidunt neque sem, nec tincidunt nisi laoreet sed.',
          files: [
            {
              "asset": "video",
              "spec": "original",
              "mime": "video/mov",
              "url": "http://s3bucket.com/path/to/file",
              "original_filename": "examplevideo.mp4",
              "state": "complete",  // new, processing, complete, failed
              "checksum": "a7b6f613b4e9ffa47669a5aaca40e6d4"
            },
            {
              "asset": "thumbnail",
              "spec": "generated",
              "mime": "image/png",
              "url": "http://techslides.com/demos/samples/sample.jpg",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            },
            {
              "asset": "video",
              "spec": "generated",
              "mime": "video/m3u8",
              "url": "http://www.auby.no/files/video_tests/h264_720p_hp_5.1_6mbps_ac3_planet.mp4",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            }
          ]
        },
        {
          id: 3,
          title: 'This is a totally awesome title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend.',
          file: "/test-video/playlist.m3u8",
          image: "http://peach.blender.org/wp-content/uploads/bird1.jpg",
          files: [
            {
              "asset": "video",
              "spec": "original",
              "mime": "video/mov",
              "url": "http://s3bucket.com/path/to/file",
              "original_filename": "examplevideo.mp4",
              "state": "complete",  // new, processing, complete, failed
              "checksum": "a7b6f613b4e9ffa47669a5aaca40e6d4"
            },
            {
              "asset": "thumbnail",
              "spec": "generated",
              "mime": "image/jpg",
              "url": "http://peach.blender.org/wp-content/uploads/bird1.jpg",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            },
            {
              "asset": "video",
              "spec": "generated",
              "mime": "video/m3u8",
              "url": "",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            }
          ],
          speakers: [
            {
              "id": 123,
              "title": "example speaker name",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "image",
                  "spec": "original",
                  "mime": "image/png",
                  "url": "http://upload.wikimedia.org/wikipedia/commons/thumb/2/27/MichaelDawson2013.jpg/257px-MichaelDawson2013.jpg",
                  "original_filename": "test-image.jpg"
                }
              ]
            }
          ],
          attachments: [
            {
              "id": 123,
              "title": "example attachment title",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "pdf",
                  "url": "http://s3bucket/path/to/attachment.pdf",
                  "original_filename": "test-pdf.pdf"
                }
              ]
            },
            {
              "id": 124,
              "title": "another attachment title",
              "description": "lots of description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "doc",
                  "url": "http://s3bucket/path/to/attachment2.pdf",
                  "original_filename": "test-pdf2.pdf"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          title: 'Corporate Results Quarter 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend.',
          files: [
            {
              "asset": "video",
              "spec": "original",
              "mime": "video/mov",
              "url": "http://s3bucket.com/path/to/file",
              "original_filename": "examplevideo.mp4",
              "state": "complete",  // new, processing, complete, failed
              "checksum": "a7b6f613b4e9ffa47669a5aaca40e6d4"
            },
            {
              "asset": "thumbnail",
              "spec": "generated",
              "mime": "image/png",
              "url": "http://techslides.com/demos/samples/sample.jpg",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            },
            {
              "asset": "video",
              "spec": "generated",
              "mime": "video/m3u8",
              "url": "",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            }
          ],
          speakers: [
            {
              "id": 123,
              "title": "example speaker name",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "image",
                  "spec": "original",
                  "mime": "image/png",
                  "url": "http://www.tottenhamhotspur.com/uploadedImages/Shared_Assets/Images/News_images/SEASON_13-14/July_2013/paulinho730v.jpg?n=5537&targetTypeID=HighResNewsImage",
                  "original_filename": "test-image.jpg"
                }
              ]
            }
          ],
          attachments: [
            {
              "id": 123,
              "title": "example attachment title",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "pdf",
                  "url": "http://s3bucket/path/to/attachment.pdf",
                  "original_filename": "test-pdf.pdf"
                }
              ]
            },
            {
              "id": 124,
              "title": "another attachment title",
              "description": "lots of description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "doc",
                  "url": "http://s3bucket/path/to/attachment2.pdf",
                  "original_filename": "test-pdf2.pdf"
                }
              ]
            }
          ]
        },
        {
          id: 5,
          title: 'This is a totally awesome title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend.',
          file: "/test-video/playlist.m3u8",
          image: "http://peach.blender.org/wp-content/uploads/bird1.jpg",
          files: [
            {
              "asset": "video",
              "spec": "original",
              "mime": "video/mov",
              "url": "http://s3bucket.com/path/to/file",
              "original_filename": "examplevideo.mp4",
              "state": "complete",  // new, processing, complete, failed
              "checksum": "a7b6f613b4e9ffa47669a5aaca40e6d4"
            },
            {
              "asset": "thumbnail",
              "spec": "generated",
              "mime": "image/jpg",
              "url": "http://peach.blender.org/wp-content/uploads/bird1.jpg",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            },
            {
              "asset": "video",
              "spec": "generated",
              "mime": "video/m3u8",
              "url": "/test-video/playlist.m3u8",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            }
          ]
        },
        {
          id: 6,
          title: 'Corporate Results Quarter 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend.',
          files: [
            {
              "asset": "video",
              "spec": "original",
              "mime": "video/mov",
              "url": "http://s3bucket.com/path/to/file",
              "original_filename": "examplevideo.mp4",
              "state": "complete",  // new, processing, complete, failed
              "checksum": "a7b6f613b4e9ffa47669a5aaca40e6d4"
            },
            {
              "asset": "thumbnail",
              "spec": "generated",
              "mime": "image/png",
              "url": "http://techslides.com/demos/samples/sample.jpg",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            },
            {
              "asset": "video",
              "spec": "generated",
              "mime": "video/m3u8",
              "url": "",
              "original_filename": "",
              "state": "complete",
              "checksum": ""
            }
          ],
          speakers: [
            {
              "id": 123,
              "title": "example speaker name",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "image",
                  "spec": "original",
                  "mime": "image/png",
                  "url": "http://upload.wikimedia.org/wikipedia/commons/thumb/2/27/MichaelDawson2013.jpg/257px-MichaelDawson2013.jpg",
                  "original_filename": "test-image.jpg"
                }
              ]
            }
          ],
          attachments: [
            {
              "id": 123,
              "title": "example attachment title",
              "description": "blah blah description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "pdf",
                  "url": "http://s3bucket/path/to/attachment.pdf",
                  "original_filename": "test-pdf.pdf"
                }
              ]
            },
            {
              "id": 124,
              "title": "another attachment title",
              "description": "lots of description text",
              "files": [
                {
                  "asset": "attachment",
                  "spec": "original",
                  "mime": "doc",
                  "url": "http://s3bucket/path/to/attachment2.pdf",
                  "original_filename": "test-pdf2.pdf"
                }
              ]
            }
          ]
        }
      ]
    }
  },
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
  '/add-media/1': {
    template: '/views/app/add-media-item/index.jade',
    data: {
      media: {
        id: 1,
      }
    }
  },
  '/edit-media/1': {
    template: '/views/app/add-media-item/index.jade',
    data: {
      settings: false,
      media: {
        id: 1,
        title: 'This is a media title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend.',
        m3u8_video: {
          "asset": "video",
          "spec": "original",
          "mime": "video/m3u8",
          "url": "/test-video/playlist.m3u8",
          "original_filename": "big_buck_bunny.mp4",
          "state": "complete"
        },
        mp4_video: {
          "asset": "video",
          "spec": "original",
          "mime": "video/mp4",
          "url": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          "original_filename": "big_buck_bunny.mp4",
          "state": "complete"
        },
        tags: [
          {
            id: 1,
            name: 'This is a tag'
          },
          {
            id: 2,
            name: 'This is another tag'
          },
          {
            id: 3,
            name: 'This is a tag with a really really really really long title'
          }
        ],
        speakers: {
          id: 1,
          title: 'A speaker name',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eget nisl vel malesuada. Vivamus et dolor eget odio consectetur scelerisque. Duis ornare volutpat nunc, nec auctor dolor euismod et. Aliquam luctus massa vitae quam adipiscing eleifend.',
          "file": {
            "asset": "image",
            "spec": "original",
            "mime": "image/png",
            "url": "http://www.tottenhamhotspur.com/uploadedImages/Shared_Assets/Images/News_images/SEASON_13-14/July_2013/paulinho730v.jpg?n=5537&targetTypeID=HighResNewsImage",
            "original_filename": "test-image.jpg"
          }
        },
        attachments: {
          id: 1,
          title: 'An attachment title',
          description: 'Blah blah description text.',
          file: {
            "asset": "attachment",
            "spec": "original",
            "mime": "pdf", // values can be 'pdf', 'doc', 'excel', 'zip', 'powerpoint' (this is so they show the correct icon in the interface)
            "url": "http://s3bucket/path/to/attachment.pdf",
            "original_filename": "test-pdf.pdf"
          }
        }
      }
    }
  }
};

module.exports = routes;
