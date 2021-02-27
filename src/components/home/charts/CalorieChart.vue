<template>
  <div>
    <zingchart :data="chartConfig" ></zingchart>
  </div>
</template>

<script>
import "zingchart/es6";
import zingchartVue from "zingchart-vue";
import { mapGetters } from 'vuex'


export default {
  components: {
    zingchart: zingchartVue
  },
  computed: {
    ...mapGetters('intakes', ['intakesByD']),
    inta() {
      let sorted = this.intakesByD.sort((a,b) => (a.intake_date > b.intake_date) ? 1 : ((b.intake_date > a.intake_date) ? -1 : 0));
      return sorted.map(o => {
        return [o.intake_date, parseInt(o.calories)]
      });
    },
    chartConfig() {
      return {
        type: 'line',
        title: {
          text: 'Intakes',
          adjustLayout: true,
          align: 'left',
          margin: 0,
        },
        series: [
          {
            values: this.inta,
            text: 'Calories'
          }
        ],
        plot: {
          aspect: 'spline',
          marker: {
            visible: false,
          },
          animation: {
              effect: "ANIMATION_SLIDE_LEFT",
          },
        },
        crosshairX:{
          plotLabel: "Calories",
          marker: {
            visible: false,
          }
        },
        tooltip: { 
          visible: false,

        },
        plotarea: {
          margin: 'dynamic',
        },
        scaleX: {
          transform: {
            type: 'date',
          },
          item: {
            width: 35,
            wrapText: true,
          }
        },
        scaleY: {
          label: {
            text: 'Calories',
          },
          minValue: '1000',
          zooming: true
        }
      };
    }
  }
};
</script>

