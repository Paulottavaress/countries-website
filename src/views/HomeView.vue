<template>
  <div>
    <CountriesList :countries="countries" list-title="All countries" />
  </div>
</template>


<script>
  import CountriesList from '@/components/CountriesList.vue';

  export default {
    components: {
      CountriesList
    },
    data() {
      return {  
        countries: []
      }
    },
    mounted() {
      fetch('https://restcountries.com/v3.1/all?fields=name,flags')
        .then(res => {
          return res.json();
        }).then(data => {
          this.countries = data;
          console.log('data', data)
        }).catch(err => {
          console.log('err', err)
        });
    },
    name: 'HomeView'
  }
</script>