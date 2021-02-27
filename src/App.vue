<template>
  <v-app>
    <v-app-bar app color="blue">
      <v-toolbar-title >Calorie Counter</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-btn
        v-for="item in menu"
        :key="item.title"
        :to="item.url"
        flat
        text 
        rounded
        dark
        >{{ item.title }}</v-btn>
        <v-btn flat dark text rounded v-if="!authenticated"
                @click="login">Log in
        </v-btn>
        <v-btn flat dark text rounded v-if="authenticated"
                @click="logout">Log Out
        </v-btn>
      </div>
      <div class="hidden-sm-and-up">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          dark
          icon
          v-bind="attrs"
          v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
          v-for="item in menu"
          :key="item.title"
          :to="item.url"
          >{{ item.title }}</v-list-item>
          <v-list-item v-if="!authenticated" @click="login">Log in</v-list-item>
          <v-list-item v-if="authenticated" @click="logout">Log out</v-list-item>
        </v-list>
      </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>

</template>

<script>
  import router from './router';
  import {APIService} from './http/APIService';
  const apiService = new APIService();
  
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'App',
    data: () => ({
      dialog: false,
      menu: [
        { title: 'Home', url:"/" },
        { title: 'Intake', url:"/intake-list" },
        { title: 'Settings', url:"/settings" },
      ]
    }),
    computed: {
      ...mapState('auth', ['authenticated'])
    },
    methods: {
      ...mapActions('auth', ['logout']),
      login() {
        router.push("/auth");
      },
    }
  };
</script>	