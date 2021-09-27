<template>
    <div>
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Second page</li>
            </ol>
        </nav>
        <!-- #Breadcrumb -->
        <div class="row">
            <div class="col-12">
                List of all users
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SecondPage',
    data() {
        return {
            name: 'Srdjan Kordic'
        }
    }
}
</script>
