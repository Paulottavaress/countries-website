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
    <CountriesList :countries="subregionCountries" list-title="Other Subregion Countries" />
  </div>
  <div v-if="noCountry">
    <h1>{{ this.errMsg }}</h1>
  </div>
</template>

<script>
  import CountriesList from '@/components/CountriesList.vue';
  import CountryInfo from '@/components/CountryInfo.vue';

  export default {
    components: {
      CountryInfo,
      CountriesList
    },
    data() {
      return {  
        country: null,
        noCountry: false,
        errMsg: null,
        subregionCountries: [],
        noSubregionCountries: false,
        noSubregionCountriesMsg: null,
        borderCountries: [],
        noBorderCountries: false,
        noBorderCountriesMsg: null
      }
    },
    methods: {
      getCountryData() {
        fetch('https://restcountries.com/v3.1/name/' + this.countryName)
          .then(res => {
            return res.json();
          }).then(data => {
            if (data.status && data.status === 404) {
              this.noCountry = true;
              this.errMsg = 'No country with this name was found!';
            }
            else this.country = data[0];
            console.log('country', this.country)
          }).catch(() => {
            this.noCountry = true;
            this.errMsg = 'An error occurred. Please try again later!'
          });
      },
      getSubregionCountries() {
        fetch('https://restcountries.com/v3.1/subregion/' + this.country.subregion)
          .then(res => {
            return res.json();
          }).then(countries => {
            if (countries.status && countries.status === 404) {
              this.noSubregionCountries = true;
              this.errMsg = 'This country has no border countries!';
            }
            else this.subregionCountries = countries.filter(country => country.name.common !== this.country.name.common);
            console.log('subregionCountries', countries)
          }).catch(() => {
            this.noSubregionCountries = true;
            this.noSubregionCountriesMsg = 'An error occurred. Please try again later!'
          }); 
      },
      getBorderCountries() {
        fetch('https://restcountries.com/v3.1/subregion/' + this.country.subregion)
          .then(res => {
            return res.json();
          }).then(countries => {
            if (countries.status && countries.status === 404) {
              this.noBorderCountries = true;
              this.errMsg = 'This country has no border countries!';
            }
            else this.borderCountries = countries.filter(country => country.name.common !== this.country.name.common);
            console.log('borderCountries', countries)
          }).catch(() => {
            this.noBorderCountries = true;
            this.noBorderCountriesMsg = 'An error occurred. Please try again later!'
          }); 
      }
    },
    mounted() {
      this.getCountryData();
    },
    name: 'CountryView',
    props: ['countryName'],
    watch: {
      country() {
        this.getBorderCountries();
        this.getSubregionCountries();
      },
      countryName() {
        this.getCountryData();
      }
    }
  }
</script>
