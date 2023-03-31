<template>
  <div v-if="country && !noCountry">
    <h1>{{ country.name.common }}</h1>
    <CountryInfo 
      :area="country.area"
      :capital="country.capital[0]"
      :continents="country.continents"
      :currencies="country.currencies"
      :languages="country.languages"
      :population="country.population"
      :subregion="country.subregion"
    />
    <CountriesList
      v-if="!noBorderCountries"
      :countries="borderCountries"
      list-title="Neighbour Countries" 
    />
    <h1 v-else>{{ this.noBorderCountriesMsg }}</h1>
    <CountriesList
      v-if="!noSubregionCountries && subregionCountries"
      :countries="subregionCountries"
      list-title="Other Subregion Countries" 
    />
    <h1 v-else>{{ this.noSubregionCountriesMsg }}</h1>
  </div>
  <div v-if="noCountry">
    <h1>{{ this.errMsg }}</h1>
  </div>
</template>

<script>
  import CountriesList from '@/components/CountriesList.vue';
  import CountryInfo from '@/components/CountryInfo.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    components: {
      CountryInfo,
      CountriesList
    },
    computed: {
      ...mapGetters({
        country: 'getCountry',
        noCountry: 'getNoCountry',
        errMsg: 'getErrMsg',
        subregionCountries: 'getSubregionCountries',
        noSubregionCountries: 'getNoSubregionCountries',
        noSubregionCountriesMsg: 'getNoSubregionCountriesMsg',
        borderCountries: 'getBorderCountries',
        noBorderCountries: 'getNoBorderCountries',
        noBorderCountriesMsg: 'getNoBorderCountriesMsg'
      })
    },
    methods: {
      ...mapActions([
        'setCountry',
        'setSubregionCountries',
        'setBorderCountries',
        'setNoBorderCountry'
      ])
    },
    mounted() {
      this.setCountry(this.countryName);
    },
    name: 'CountryView',
    props: ['countryName'],
    watch: {
      country() {
        if (this.country.borders) this.setBorderCountries(this.country.borders.join(','));
        else this.setNoBorderCountry();
        this.setSubregionCountries(this.country.subregion);
      },
      countryName() {
        this.setCountry(this.countryName);
      }
    }
  }
</script>
