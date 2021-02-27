<template>
    <v-main>
        <!-- Mobile -->
        <v-card :elevation="0">
            <v-data-iterator 
            :items="intakesByD"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sort-by="['intake_date']"
            :sort-desc="sortDesc"
            hide-default-footer              
            item-key="calories"
            >
                <!-- toolbars -->
                <template v-slot:header>
                    <v-container fluid>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-toolbar :elevation="1" :rounded="true" class="mb-1">
                                <v-text-field
                                v-model="search"
                                clearable
                                flat
                                solo-inverted
                                hide-details
                                prepend-inner-icon="mdi-magnify"
                                label="Search"
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                </v-toolbar>
                            </v-col>
                            <v-col cols="12" justify>
                                <v-toolbar :elevation="1" :rounded="true">
                                    <v-col>
                                        <v-select
                                        v-model="sortBy"
                                        flat
                                        solo-inverted
                                        hide-details
                                        :items="keys"
                                        label="Sort by"
                                        ></v-select>
                                    </v-col>
                                    <v-col>
                                        <v-btn-toggle v-model="sortDesc" mandatory>
                                            <v-btn depressed color="blue" :value="false">
                                                <v-icon>mdi-arrow-up</v-icon>
                                            </v-btn>
                                            <v-btn depressed color="blue" :value="true">
                                                <v-icon>mdi-arrow-down</v-icon>
                                            </v-btn>
                                        </v-btn-toggle>
                                    </v-col>
                                </v-toolbar>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
                <!-- data cards -->
                <template v-slot:default="{ items, isExpanded, expand }">
                <v-row>
                    <v-col v-for="item in items" :key="item.calories" cols="12">
                        <v-card>
                            <v-card-title class="pb-0 pt-0 pl-0">
                                <v-col cols="9" class="text-left body-2 text-truncate">{{item.intake_date}}</v-col>
                                <v-col cols="3" class="text-center">
                                    <v-card-actions>
                                    <v-icon @click="$emit('update', item)" class="small">mdi-pencil</v-icon>
                                    <v-icon @click="$emit('delete', item)" class="small">mdi-delete</v-icon>
                                    <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                                    </v-card-actions>
                                </v-col>
                            </v-card-title>
                            <v-divider></v-divider>

                            <v-list v-show="isExpanded(item)" dense>
                                <v-list-item>
                                    <v-list-item-content>Calories:</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.calories }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Current Weight (lbs):</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.current_weight }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Body Fat (%):</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.fat_perc }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Protein (g):</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.protein }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Fat (g):</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.fat }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Carbs (g):</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.carbs }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Intake Date:</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.intake_date }}</v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
                </template>
                <!-- footer -->
                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <span class="grey--text" style="font-size: 10px">Items per page</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                dark
                                text
                                color="primary"
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                                >
                                    {{ itemsPerPage }}
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                v-for="(number, index) in itemsPerPageArray"
                                :key="index"
                                @click="updateItemsPerPage(number)"
                                >
                                    <v-list-item-title>{{ number }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <span
                        class="mr-4
                        grey--text"
                        style="font-size: 10px"
                        >
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn
                        fab
                        dark
                        color="blue darken-3"
                        class="mr-1"
                        @click="formerPage"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                        fab
                        dark
                        color="blue darken-3"
                        class="ml-1"
                        @click="nextPage"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>  
        </v-card>
    </v-main>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
        search: '',
        sortBy: 'intake_date',
        keys: [
            'Calories',
            'Intake_Date'
        ],
        sortDesc: false,
        page: 1,
        itemsPerPageArray: [4, 8, 12],
        itemsPerPage: 4,
    }),
    computed: {
      ...mapGetters('intakes', ['intakesByD']),
      numberOfPages() {
        return Math.ceil(this.intakesByD.length / this.itemsPerPage)
      },
    },
    methods: {
      nextPage() {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage() {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage(number) {
        this.itemsPerPage = number
      },
    }
  };
</script>
