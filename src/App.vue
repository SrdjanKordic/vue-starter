<template>
	<div id="app">
		<div class="container-fluid">
			<div class="row">
				<aside class="col-5 col-md-4 col-lg-3 col-xl-2 my-sm-3 col-sidebar">
					<Sidebar />
				</aside>
				<div class="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-10 col-content" id="content">
					<Header />
					<div class="main-container mb-5">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar.vue'
export default {
	name: 'App',
	components: { Header, Sidebar },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;800&display=swap');
@import '../src/assets/sass/design';
@import '~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4';

#app {
	display: flex;
	background-color: #f8f8f8;
}
.col-content {
	min-height: 100vh;
}

@media (max-width: 575.98px) {
	.col-sidebar {
		width: 0 !important;
		max-width: 0 !important;
		padding: 0 !important;
		margin: 0 !important;
	}
}
</style>
