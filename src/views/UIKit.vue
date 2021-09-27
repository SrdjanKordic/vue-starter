<template>
    <div>
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">UI Kit</li>
            </ol>
        </nav>
        <!-- #Breadcrumb -->

        <div class="row">
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-header">
                        <div class="card-text fs-5">Filled buttons</div>
                    </div>
                    <div class="card-body">
                        <div class="col-12">
                            <a class="btn btn-primary">Primary</a>
                            <a class="btn btn-secondary">Secondary</a>
                            <a class="btn btn-success">Success</a>
                            <a class="btn btn-danger">Danger</a>
                            <a class="btn btn-warning">Warning</a>
                            <a class="btn btn-info">Info</a>
                            <a class="btn btn-dark">Dark</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-header">
                        <div class="card-text fs-5">Outline buttons</div>
                    </div>
                    <div class="card-body">
                        <div class="col-12">
                            <a class="btn btn-outline-primary">Primary</a>
                            <a class="btn btn-outline-secondary">Secondary</a>
                            <a class="btn btn-outline-success">Success</a>
                            <a class="btn btn-outline-danger">Danger</a>
                            <a class="btn btn-outline-warning">Warning</a>
                            <a class="btn btn-outline-info">Info</a>
                            <a class="btn btn-outline-dark">Dark</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-header">
                        <div class="card-text fs-5">Button sizes</div>
                    </div>
                    <div class="card-body">
                        <div class="col-12">
                            <a class="btn btn-primary btn-sm">Primary SM</a>
                            <a class="btn btn-secondary">Secondary</a>
                            <a class="btn btn-success btn-lg">Success LG</a>
                            <a class="btn btn-outline-danger btn-sm">Danger SM</a>
                            <a class="btn btn-outline-warning">Warning</a>
                            <a class="btn btn-outline-info btn-lg">Info LG</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <div class="card shadow-sm">
                    <div class="card-header border-bottom border-gray-300">
                        <h2 class="h5 mb-0">Progress track</h2>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center mb-4">
                            <div class="col-auto">
                                <span class="icon icon-md text-purple"><span class="fab fa-bootstrap"></span></span>
                            </div>
                            <div class="col">
                                <div class="progress-wrapper">
                                    <div class="progress-info">
                                        <div class="h6 mb-0">Rocket - SaaS Template</div>
                                        <div class="small fw-bold text-dark"><span>34 %</span></div>
                                    </div>
                                    <div class="progress mb-0">
                                        <div
                                            class="progress-bar bg-purple"
                                            role="progressbar"
                                            aria-valuenow="34"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="width: 34%;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mb-4">
                            <div class="col-auto">
                                <span class="icon icon-md text-danger"><span class="fab fa-angular"></span></span>
                            </div>
                            <div class="col">
                                <div class="progress-wrapper">
                                    <div class="progress-info">
                                        <div class="h6 mb-0">Pixel - Design System</div>
                                        <div class="small fw-bold text-dark"><span>60 %</span></div>
                                    </div>
                                    <div class="progress mb-0">
                                        <div
                                            class="progress-bar bg-danger"
                                            role="progressbar"
                                            aria-valuenow="60"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="width: 60%;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mb-4">
                            <div class="col-auto">
                                <span class="icon icon-md text-success"><span class="fab fa-vuejs"></span></span>
                            </div>
                            <div class="col">
                                <div class="progress-wrapper">
                                    <div class="progress-info">
                                        <div class="h6 mb-0">Spaces - Listings Template</div>
                                        <div class="small fw-bold text-dark"><span>45 %</span></div>
                                    </div>
                                    <div class="progress mb-0">
                                        <div
                                            class="progress-bar bg-tertiary"
                                            role="progressbar"
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="width: 45%;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mb-4">
                            <div class="col-auto">
                                <span class="icon icon-md text-info"><span class="fab fa-react"></span></span>
                            </div>
                            <div class="col">
                                <div class="progress-wrapper">
                                    <div class="progress-info">
                                        <div class="h6 mb-0">Stellar - Dashboard</div>
                                        <div class="small fw-bold text-dark"><span>35 %</span></div>
                                    </div>
                                    <div class="progress mb-0">
                                        <div
                                            class="progress-bar bg-info"
                                            role="progressbar"
                                            aria-valuenow="35"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="width: 35%;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <span class="icon icon-md text-purple"><span class="fab fa-bootstrap"></span></span>
                            </div>
                            <div class="col">
                                <div class="progress-wrapper">
                                    <div class="progress-info">
                                        <div class="h6 mb-0">Volt - Dashboard</div>
                                        <div class="small fw-bold text-dark"><span>34 %</span></div>
                                    </div>
                                    <div class="progress mb-0">
                                        <div
                                            class="progress-bar bg-purple"
                                            role="progressbar"
                                            aria-valuenow="34"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="width: 34%;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-4">
                <div class="card shadow">
                    <div class="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                        <div class="d-block">
                            <div class="h6 fw-normal text-gray mb-2">New customers</div>
                            <h2 class="h3">452</h2>
                            <div class="small mt-2">
                                <span class="fas fa-angle-up text-success"></span>
                                <span class="text-success fw-bold">18.2%</span>
                            </div>
                        </div>
                        <div class="d-block ms-auto">
                            <div class="d-flex align-items-center text-right mb-2">
                                <span class="shape-xs rounded-circle bg-dark me-2"></span>
                                <span class="fw-normal small">Last month</span>
                            </div>
                            <div class="d-flex align-items-center text-right">
                                <span class="shape-xs rounded-circle bg-tertiary me-2"></span>
                                <span class="fw-normal small">This month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Simple card with text -->
        <div class="row">
            <div class="col-lg-4 mb-4">
                <div class="card bg-success text-white shadow">
                    <div class="card-body">
                        Success
                        <div class="text-white-50 small">#1cc88a</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card bg-info text-white shadow">
                    <div class="card-body">
                        Success
                        <div class="text-white-50 small">#1cc88a</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card bg-danger text-white shadow">
                    <div class="card-body">
                        Success
                        <div class="text-white-50 small">#1cc88a</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Simple with icon -->
        <div class="row">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-start shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Earnings (Monthly)
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                <font-awesome-icon :icon="['fas', 'box']" class="me-1 fa-2x text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <div class="card shadow-sm">
                    <stats-line-chart
                        :data="statsChart"
                        :options="statsChartOptions"
                        :height="300"
                        class="mb-4"
                    ></stats-line-chart>
                </div>
            </div>
            <div class="col-6">
                <div class="card shadow-sm">
                    <stats-bar-chart
                        :data="statsChart"
                        :options="statsChartOptions"
                        :height="300"
                        class="mb-4"
                    ></stats-bar-chart>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-3">
                <div class="card shadow-sm">
                    <stats-pie-chart :data="statsChartPie" :height="300" class="mb-4"></stats-pie-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//https://picsum.photos/640/480
import StatsLineChart from '../components/charts/StatsLineChart'
import StatsBarChart from '../components/charts/StatsBarChart'
import StatsPieChart from '../components/charts/StatsPieChart'
export default {
    name: 'widgets',
    data() {
        return {
            statsChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    //display: false,
                },
                scales: {
                    xAxes: [
                        {
                            //stacked: true,
                        }
                    ],
                    yAxes: [
                        {
                            //stacked: true
                        }
                    ]
                }
            },
            statsChart: {
                labels: ['mon', 'thu', 'wen', 'thr', 'fry', 'sat', 'sun'],
                datasets: [
                    {
                        label: 'APP Open',
                        data: [5, 7, 1, 9, 2, 4, 1],
                        fill: true,
                        borderWidth: 1,
                        borderColor: '#2a9836',
                        backgroundColor: 'rgba(42, 152, 54, 0.05)'
                    },
                    {
                        label: 'Widget Open',
                        data: [1, 2, 3, 1, 2, 3, 5],
                        fill: true,
                        borderWidth: 1,
                        borderColor: '#A9B4F6',
                        backgroundColor: 'rgba(55, 81, 255, 0.05)'
                    }
                ]
            },
            statsChartPie: {
                labels: ['January', 'February'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: ['#f87979', 'ff2123'],
                        data: [40, 20]
                    }
                ]
            }
        }
    },
    components: {
        StatsLineChart,
        StatsBarChart,
        StatsPieChart
    }
}
</script>
