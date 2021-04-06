import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/pages/PageHome'
import Game from '@/pages/PageGame'
import ThreadShow from '@/pages/PageThreadShow'
import PageNotFound from '@/pages/PageNotFound'
import PageForum from '@/pages/PageForum'
import Category from '@/pages/PageCategory'
import Profile from '@/pages/PageProfile'
import ThreadCreate from '@/pages/PageThreadCreate'
import ThreadEdit from '@/pages/PageThreadEdit'
import Register from '@/pages/PageRegister'
import Login from '@/pages/PageSignIn'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiredAuth: true }
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: Profile,
      meta: { requiredAuth: true },
      props: {
        edit: true
      }
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: PageForum,
      props: true
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      meta: { requiredAuth: true },
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true,
      meta: { requiredAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiredGuest: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiredGuest: true }
    },

    //TODO:游戏页面
    {
      path: '/game/:forumId',
      name: 'Game',
      component: Game
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('auth/initAuthentication').then(user => {
    if (to.matched.some(route => route.meta.requiredAuth)) {
      //to.matched.some(route=>route.meta.requiredAuth) 对匹配 这个的进行检查，而不是对他的子路由设置 meta
      //auth the user
      if (user) {
        next();
      } else {
        next({ name: "Login", query: { redirectTo: to.path } });
      }
    } else if (to.matched.some(route => route.meta.requiredGuest)) {
      if (!user) {
        next();
      } else {
        next({ name: "Home" });
      }
    } else {
      next()
    }
  })
})

export default router;
