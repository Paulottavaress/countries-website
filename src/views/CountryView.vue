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
      v-if="!noSubregionCountries"
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
              this.noSubregionCountriesMsg = 'There is no other country in this subregion!';
            }
            else this.subregionCountries = countries.filter(country => country.name.common !== this.country.name.common);
          }).catch(() => {
            this.noSubregionCountries = true;
            this.noSubregionCountriesMsg = 'An error occurred. Please try again later!'
          }); 
      },
      getBorderCountries() {
        fetch('https://restcountries.com/v3.1/alpha?codes=' + this.country.borders.join(','))
        .then(res => {
          return res.json();
        }).then(countries => {
          if (countries.status && countries.status === 404) {
            this.noBorderCountries = true;
            this.noBorderCountriesMsg = 'This country does not have border countries!';
          } else this.borderCountries = countries;
          console.log('this.borderCountries', this.borderCountries)
        }).catch(() => {
          this.noBorderCountries = true;
          this.noBorderCountriesMsg = 'An error occurred. Please try again later!';
        })
      }
    },
    mounted() {
      this.getCountryData();
    },
    name: 'CountryView',
    props: ['countryName'],
    watch: {
      country() {
        if (this.country.borders) this.getBorderCountries();
        else {
          this.noBorderCountries = true;
          this.noBorderCountriesMsg = 'This country does not have neighbours!';
        }

        this.getSubregionCountries();
      },
      countryName() {
        this.getCountryData();
      }
    }
  }
</script>
