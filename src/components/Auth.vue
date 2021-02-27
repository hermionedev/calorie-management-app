<template>
  <v-container grid-list-md>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
          <v-tabs v-model="tab" show-arrows background-color="blue accent-3" icons-and-text dark grow>
            <v-tabs-slider color="black"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field 
                          v-model="credentials.username" 
                          :counter="70"
                          label="Username"
                          :rules="rules.username"
                          maxlength="70" 
                          required
                          prepend-icon="mdi-account-circle"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                          :type="showPassword ? 'text' : 'password'"
                          v-model="credentials.password"
                          :counter="20"
                          label="Password" 
                          :rules="rules.password"
                          maxlength="20"
                          required
                          prepend-icon="mdi-lock"
                          :append-icon="showPassword?'mdi-eye' : 'mdi-eye-off'" 
                          @click:append="showPassword = !showPassword"
                          name="input-10-1" 
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                          <v-btn x-large block :disabled="!valid" color="success" @click="login">Login</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field 
                          v-model="credentials.username"
                          :counter="70"
                          label="Username"
                          :rules="rules.username" 
                          maxlength="70"
                          required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                          :type="showPassword ? 'text' : 'password'"
                          v-model="credentials.password" 
                          :counter="20"
                          label="Password"
                          :rules="rules.password"
                          maxlength="20"
                          required
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                          name="input-10-1" 
                          hint="At least 8 characters" 
                          @click:append="showPassword = !showPassword"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                          block 
                          v-model="verify" 
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                          :rules="[rules.required, passwordMatch]" 
                          :type="showPassword ? 'text' : 'password'" 
                          name="input-10-1" 
                          label="Confirm Password" 
                          counter 
                          @click:append="showPassword = !showPassword"
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                          <v-btn x-large block :disabled="!valid" color="success" @click="register">Register</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-dialog>
      </v-app>
    </div>
  </v-container>
</template>

<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();
  
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Auth',
    data: () => ({
      valid: true,
      dialog: true,
      verify: "",
      tab: 0,
      tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
      ],
      rules: {
        username: [
          v => !!v || "Username is required",
          v => (v && v.length > 3) || "A username must be more than 3 characters long",
          v => /^[a-z0-9_]+$/.test(v) || "A username can only contain letters and digits"
        ],
        password: [
          v => !!v || "Password is required",
          v => (v && v.length > 7) || "The password must be longer than 7 characters"
        ]
      },
      showPassword: false,
    }),
    computed: {
      passwordMatch() {
        return () => this.credentials.password === this.verify || "Password must match";
      },
      credentials: {
        get() {
          return this.$store.state.auth.credentials
        },
        set(newValue) {
          this.$store.commit('auth/setAuthentication', newValue)
        }
      }
    },
    methods: {
      ...mapActions('auth', ['login', 'register'])
    },
  }
</script>
