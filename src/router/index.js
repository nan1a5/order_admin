import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import(/* webpackChunkName: "order" */ '../views/category/CategoryView.vue')
      },
      {
        path: 'category/create',
        name: 'category-create',
        component: () => import(/* webpackChunkName: "order-create" */ '../views/category/CategoryCreateView.vue')
      },
      {
        path: 'category/edit/:id',
        name: 'category-edit',
        component: () => import(/* webpackChunkName: "order-edit" */ '../views/category/CategoryEditView.vue')
      },
      {
        path: 'recipe',
        name: 'recipe',
        component: () => import(/* webpackChunkName: "recipe" */ '../views/recipe/RecipeView.vue')
      },
      {
        path: 'recipe/create',
        name: 'recipe-create',
        component: () => import(/* webpackChunkName: "recipe-create" */ '../views/recipe/RecipeCreateView.vue')
      },
      {
        path: 'recipe/edit/:id',
        name: 'recipe-edit',
        component: () => import(/* webpackChunkName: "recipe-edit" */ '../views/recipe/RecipeEditView.vue')
      },
      {
        path: 'order/history',
        name: 'order-history',
        component: () => import(/* webpackChunkName: "order-history" */ '../views/order/OrderHistoryView.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import(/* webpackChunkName: "order" */ '../views/order/OrderView.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
