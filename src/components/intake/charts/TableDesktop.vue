<template>
  <v-main>
    <v-card>
      <v-card-title>
        Daily Intake
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="intakesByD"
      :search="search"
      :sort-by="['intake_date']"
      :sort-desc="[false]"
      class="elevation-1"
      style="max-height: 300px; overflow-y: auto"
      >
        <template v-slot:item="props">
          <tr>
            <td nowrap="true" align="left"><v-chip dark :color="getColor(props.item.calories)">{{ props.item.calories }}</v-chip></td>
            <td nowrap="true" align="left">{{ props.item.current_weight }}</td>
            <td nowrap="true" align="left">{{ props.item.fat_perc }}</td>
            <td nowrap="true" align="left">{{ props.item.protein }}</td>
            <td nowrap="true" align="left">{{ props.item.fat }}</td>
            <td nowrap="true" align="left">{{ props.item.carbs }}</td>
            <td nowrap="true" align="left">{{ props.item.intake_date }}</td>
            <td align="center"><v-icon @click="$emit('update', props.item)">mdi-pencil</v-icon></td>
            <td align="center"><v-icon @click="$emit('delete', props.item)">mdi-delete</v-icon></td>
          </tr>  
        </template>
      </v-data-table>
    </v-card> 
  </v-main>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    data() {
      return {
        search: '',
        headers: [
          {text: 'Calories', sortable: true, align: 'left', value: 'calories'},
          {text: 'Current Weight (lbs)', sortable: false, align: 'left', value: 'current_weight'},
          {text: 'Body Fat (%)', sortable: false, align: 'left', value: 'body_fat'},
          {text: 'Protein (g)', sortable: false, align: 'left',},
          {text: 'Fat (g)', sortable: false, align: 'left',},
          {text: 'Carbs (g)', sortable: false, align: 'left',},
          {text: 'Intake Date', sortable: true, align: 'left', value: 'intake_date'},
          {text: 'Update', sortable: false, align: 'center',},
          {text: 'Delete', sortable: false, align: 'center',}
        ],
        sortBy: 'intake_date',
        sortDesc: false,
      }
    },
    methods: {
      getColor(calories) {
        if (this.settings.calorie_min_max === true)
          if (calories > this.settings.calorie_goal) return 'red'
          else return 'green'
        else
          if (calories < this.settings.calorie_goal) return 'red'
          else return 'green'
      }
    },
    computed: {
      ...mapGetters('intakes', ['intakesByD']),
      ...mapState('settings', ['settings'])
    },
  };
</script>