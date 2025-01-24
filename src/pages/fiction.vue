<template>

    <div>
<MovieTable gender="fiction" pageTitle="Ficção científica"></MovieTable>

    </div>

</template>



<script>
import MovieTable from '@/components/MovieTable.vue';

export default {

name:   "Movies",
components: {
    MovieTable
}
}


</script>


<style>


</style>