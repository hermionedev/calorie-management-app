<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <blockquote>
            &#8220;Welcome {{validUserName}}!&#8221;
            <footer>
              <small>
                <em>&mdash;Calorie Counter Services.</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="10">
          <date-picker />
          <calorie-chart />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import router from '../../router';
  import {APIService} from '../../http/APIService';
  import CalorieChart from './charts/CalorieChart.vue';
  import DatePicker from '../date_picker/DatePicker.vue';
  const apiService = new APIService();

  export default {
    name: 'Home',
    components: {
      CalorieChart,
      DatePicker,
    },
    data: () => ({
      validUserName: "Guest",
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      viewIntake() {
        router.push('/intake-list');
      },
      viewSettings() {
        router.push('/settings-list');
      },
      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }
    }
  }
</script>
