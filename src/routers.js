'use strict'

export default function (router) {
  router.map({
    '*': {
      component: function (resolve) {
        require(['./views/signin.vue'], resolve)
      }
    },
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./views/home.vue'], resolve)
      }
    },
    '/home': {
      name: 'home',
      component: function (resolve) {
        require(['./views/home.vue'], resolve)
      }
    },
    '/signin': {
      name: 'signin',
      component: function (resolve) {
        require(['./views/signin.vue'], resolve)
      }
    },
    '/signup': {
      name: 'signup',
      component: function (resolve) {
        require(['./views/signup.vue'], resolve)
      }
    },
    '/users/:uid/edit/': {
      name: 'usersedit',
      component: function (resolve) {
        require(['./views/users/edit.vue'], resolve)
      },
      auth: true
    },
    '/personal': {
      name: 'personal',
      component: function (resolve) {
        require(['./views/personal.vue'], resolve)
      }
    },
    '/teams': {
      name: 'teams',
      component: function (resolve) {
        require(['./views/teams/index.vue'], resolve)
      }
    },
    '/teams/:tid': {
      name: 'team',
      component: function (resolve) {
        require(['./views/teams/show.vue'], resolve)
      }
    },
    '/teams/new': {
      name: 'teamsnew',
      component: function (resolve) {
        require(['./views/teams/new.vue'], resolve)
      },
      auth: true
    },
    '/teams/:tid/edit': {
      name: 'teamsedit',
      component: function (resolve) {
        require(['./views/teams/edit.vue'], resolve)
      },
      auth: true
    },
    '/teams/:tid/playeds': {
      name: 'teamsplayeds',
      component: function (resolve) {
        require(['./views/teams/playeds.vue'], resolve)
      }
    },
    '/teams/:tid/users': {
      name: 'teamsusers',
      component: function (resolve) {
        require(['./views/teams/users.vue'], resolve)
      }
    },

    '/games': {
      name: 'games',
      component: function (resolve) {
        require(['./views/games.vue'], resolve)
      }
    },
    '/games/:gid': {
      name: 'game',
      component: function (resolve) {
        require(['./views/games/show.vue'], resolve)
      }
    },
    '/games/:gid/constitution': {
      name: 'constitution',
      component: function (resolve) {
        require(['./views/games/constitution.vue'], resolve)
      }
    },
    '/games/:gid/playeds': {
      name: 'playeds',
      component: function (resolve) {
        require(['./views/playeds/index.vue'], resolve)
      }
    },
    '/games/:gid/points': {
      name: 'points',
      component: function (resolve) {
        require(['./views/games/points.vue'], resolve)
      }
    },

    '/playeds/:pid/techstats': {
      name: 'techstats',
      component: function (resolve) {
        require(['./views/techstats/index.vue'], resolve)
      }
    },
    '/playeds/:pid/analyze': {
      name: 'analyze',
      component: function (resolve) {
        require(['./views/techstats/analyze.vue'], resolve)
      }
    },

    '/discover': {
      name: 'discover',
      component: function (resolve) {
        require(['./views/discover.vue'], resolve)
      }
    }
  })
}
