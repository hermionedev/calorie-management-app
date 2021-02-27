<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Settings information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>
 
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-text-field v-model="settings.calorie_goal" label="Calorie Goal" required type="number" />
                    <v-text-field v-model="settings.weight_goal" label="Weight Goal (lbs)" required type="number" />
                    <v-text-field v-model="settings.fat_perc_goal" label="Body Fat Goal (%)" required type="number" />
                    <v-text-field v-model="settings.protein_goal" label="Protein Goal" required type="number" />
                    <v-text-field v-model="settings.fat_goal" label="Fat Goal" required type="number" />
                    <v-text-field v-model="settings.carb_goal" label="Carb Goal" required type="number" />
                    <v-select
                    v-model="settings.calorie_min_max"
                    label="My calories goal is"
                    :items="items"
                    item-text="answer"
                    item-value="value"
                    return-value
                    required
                    type="boolean"
                    />
                    <v-text-field
                    v-model="settings.set_date"
                    label="Set Date"
                    required
                    type="date"
                    />
                </v-container>
                <v-btn class="blue white--text" @click="updateSettings(settings)">Update</v-btn>
                <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>  
      </v-col>
    </v-row>
  </v-container>
</template>
 
 
<script>
  import router from '../../router';
  import {APIService} from '../../http/APIService';
  const apiService = new APIService();
  import { mapActions, mapState } from 'vuex'
 
  export default {
    name: 'SettingsCreate',
    components: {},
    data() {
      return {
        settings: [],
        items: [
          { answer: 'the most calories I can get', value: true },
          { answer: 'the least calories I can get', value: false }
        ],
        showError: false,
        pageTitle: "Update Settings",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      ...mapActions('settings', ['updateSettings']),
      cancelOperation(){
         router.push("/");
      }
    },
    computed: {
      /*settings: {
        get() {
          return this.$store.state.settings.settings
        },
        set(newValue) {
          this.$store.commit('settings/updateSettings', newValue)
        }
      }*/
    },
    mounted() {
      this.settings = JSON.parse(JSON.stringify(this.$store.state.settings.settings))
    }
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
