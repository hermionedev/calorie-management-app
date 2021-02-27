<template>
    <v-menu
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-text-field
        v-model="dateRangeText"
        label="Intake Date Range"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        ></v-text-field>
    </template>
    <v-date-picker v-model="dates" range />
    </v-menu>
</template>

<script>
  export default {
    name: "DatePicker",

    computed: {
      dates: {
        get() {
          return this.$store.state.intakes.dates
        },
        set(newValue) {
          this.$store.commit("intakes/setDates", (newValue))
        }
      },
      dateRangeText() {
        return this.dates.join(' ~ ')
      },
    },

  };
</script>