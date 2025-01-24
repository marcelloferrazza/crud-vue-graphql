<template>

    <div>
<MovieTable gender="all" pageTitle="Todos os filmes cadastrados"></MovieTable>

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