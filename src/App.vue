<template>
  <v-app>

    <v-navigation-drawer dark app disable-resize-watcher temporary v-model="sideNav">
      <v-card
        
        tile
      >
        <v-list>
          <v-list-item-group>

            <v-list-item
             v-for="item in menuItems"
              :key="item.title"
              router
              :to="item.link"
            >

              <v-list-item-action>
                <v-icon left>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>{{item.title}}</v-list-item-content>
          </v-list-item>

          <!-- log out -->
          <v-list-item v-if="userIsAuthenticated" @click="onLogout">
              <v-list-item-action>
                <v-icon left>exit_to_app</v-icon>
            </v-list-item-action>
            <v-list-item-content>Sign Out</v-list-item-content>
          </v-list-item>

          </v-list-item-group>
        
      </v-list>
      </v-card>
      
    </v-navigation-drawer>
    <v-card>
      <v-toolbar dark>
        <v-app-bar-nav-icon
        @click.native="sideNav = !sideNav"
        class="hidden-sm-and-up"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">Dev-Meetup</router-link>  
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            v-for="item in menuItems"
            :key="item.title"
            router
            :to="item.link"
          >
            <v-icon left>{{item.icon}}</v-icon>
              {{item.title}}
          </v-btn>
          <v-btn
            text
            v-if="userIsAuthenticated"
            @click="onLogout"
          >
            <v-icon left>exit_to_app</v-icon>
              Sign Out
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>

    </v-card>
    

    <!-- main content, with navigation above 'main' -->
    <main>

      <router-view></router-view>

    </main>
    
  </v-app>
</template>

<script>


export default {
  
  data: () => ({
    
    sideNav: false,
    
    
  }),
  computed: {
    menuItems () {
        let menuItems = [
          { icon: 'face', title: 'Sign Up', link: '/signup'},
          { icon: 'lock_open', title: 'Sign In', link: '/signin'}
        ]

        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
            { icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
            { icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
    return menuItems
    },
    userIsAuthenticated () {

      return this.$store.getters.user !== null && this.$store.getters.user !== undefined

    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch("logout")
    }
  }
}
</script>
