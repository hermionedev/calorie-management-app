<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em>&mdash;Calorie Counter Services.</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New intake has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Intake has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected intake has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
          <date-picker />
          <table-desktop v-if="!isMobile" @update="updateIntake" @delete="deleteIntake" />
          <table-mobile v-else @update="updateIntake" @delete="deleteIntake" />
        <v-btn class="blue mt-4 white--text" @click="addNewIntake">Add Intake</v-btn>  
        </v-col>  
      </v-row>
    </v-container>  
  </v-main>
</template>

<script>
  import router from '../../router';
  import {APIService} from '../../http/APIService';
  const apiService = new APIService();

  import TableDesktop from './charts/TableDesktop';
  import TableMobile from './charts/TableMobile';
  import DatePicker from '../date_picker/DatePicker';

  import { mapActions } from 'vuex'

  export default {
    name: "IntakeList",
    components: {
      TableDesktop,
      TableMobile,
      DatePicker
    },
    data: () => ({
      validUserName: "Guest",
      intakeSize: 0,
      showMsg: '',
      isMobile: false,
    }),
    mounted() {
      this.showMessages();
      this.getUser();
    },
    methods: {
      ...mapActions('intakes', ['deleteIntake']),
      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      },
      onResize() {
          if (window.innerWidth < 600)
            this.isMobile = true;
          else  
            this.isMobile = false;
        },
      showMessages(){
        console.log(this.$route.params.msg)
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      addNewIntake() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/intake-create');
        } else {
          router.push("/auth");
        }
      },
      updateIntake(intake) {
        this.$store.commit('intakes/setIntake', intake)
        this.$store.commit('intakes/setUpdate', true)
        router.push('/intake-create/' + intake.id);
      },
    }
  };
</script>
