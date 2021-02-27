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
              Please verify Intake information.
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
                    <v-text-field v-model="intake.calories" label="Calories" required/>
                    <v-text-field v-model="intake.current_weight" label="Weight (lbs)" required />
                    <v-text-field v-model="intake.fat_perc" label="Body Fat (%)" required />
                    <v-text-field v-model="intake.protein" label="Protein (g)" required />
                    <v-text-field v-model="intake.fat" label="Fat (g)" required type="number" />
                    <v-text-field v-model="intake.carbs" label="Carbs (g)" required type="number" />
                    <v-text-field v-model="intake.intake_date" label="Intake Date" required type="date" />
                </v-container>
                <v-btn v-if="!isUpdate" class="blue white--text" @click="save">Save</v-btn>
                <v-btn v-if="isUpdate" class="blue white--text" @click="save">Update</v-btn>
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
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'IntakeCreate',
    components: {},
    data() {
      return {
        showError: false,
        saved: false,
        canceled: false,
        //intake: [],
        pageTitle: "Add New Intake",
        showMsg: '',
      };
    },
    methods: {
      ...mapActions('intakes', ['updateIntake', 'createIntake']),

      save() {
        this.saved = true
        if (this.isUpdate) {
          this.updateIntake(this.intake)
        }
        else {
          this.createIntake(this.intake)
        }
      },
      cancelOperation(){
        this.canceled = true
        this.$store.commit('intakes/setUpdate', false)
        this.$store.commit('intakes/updateIntake', [])
        router.push("/intake-list");
      },
    },
    computed: {
      ...mapState('intakes', ['isUpdate']),
      intake: {
        get() {
          return this.$store.state.intakes.intake
        },
        set(newValue) {
          this.$store.commit('intakes/updateIntake', newValue)
        }
      }
    },
    mounted() {
      if (this.isUpdate) {
        this.pageTitle = "Edit Intake"
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.saved || this.canceled) {
        next()
      }else {
        const confirm = window.confirm("Save changes?")
        if (confirm && this.isUpdate) {
          this.updateIntake(this.intake)
          next()
        }
        else {
          this.createIntake(this.intake)
        }
        next(false)
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
