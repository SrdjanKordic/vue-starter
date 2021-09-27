<template>
  <div class="page-wrapper">
    <div class="page-header ms-1">
      <h4 class="m-0">🥳 Welcome back {{ user.name }}</h4>
      <small class="text-secondary">This is a small page with great posibilities edited</small>
    </div>

    <div class="page-body p-3">
      <div class="row">
        <div class="col-12 col-lg-3 text-center rounded shadow-sm bg-white p-2">
          Visitors
          <stats-pie-chart :data="statsChartPie" :height="300" class="mb-4"></stats-pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsPieChart from '../components/charts/StatsPieChart'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      statsChartPie: {
        labels: ['Today', 'Yesterday'],
        datasets: [
          {
            label: 'Visitors',
            backgroundColor: ['#f87979', 'ff2123'],
            data: [356, 568],
          },
        ],
      },
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      authenticated: 'authenticated',
    }),
  },
  components: {
    StatsPieChart,
  },
}
</script>
