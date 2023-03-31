<template>
  <div>
    <CountriesList
      :countries="countries"
      list-title="All countries" 
    />
  </div>
</template>


<script>
  import CountriesList from '@/components/CountriesList.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    components: {
      CountriesList
    },
    computed: {
      ...mapGetters({
        countries: 'getAllCountries'
      })
    },
    methods: {
      ...mapActions([
        'setAllCountries'
      ])
    },
    mounted() {
      this.setAllCountries();
    },
    name: 'HomeView'
  }
</script>