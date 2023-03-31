<template>
  <p>Area: {{ area.toLocaleString() }} km²</p>
  <p>Capital: {{ capital }}</p>
  <p>Continent(s): {{ continentsString }}</p>
  <p>Currency: {{ currenciesString }}</p>
  <p>Language(s): {{ languagesString }}</p>
  <p>Population: {{ population.toLocaleString() }}</p>
  <p>Subregion: {{ subregion }}</p>
</template>

<script>
  export default {
    computed: {
      continentsString() {
        return this.continents.join(', ');
      },
      currenciesString() {
        let currencies = '';
        const currenciesKeys = Object.keys(this.currencies);
        currenciesKeys.forEach((key, i) => {
          if (i > 0) currencies += ', ';
          currencies += `${this.currencies[key].name} (${key}) - ${this.currencies[key].symbol}`
        });
        return currencies;
      },
      languagesString() {
        let languages = '';
        const languagesKeys = Object.keys(this.languages);
        languagesKeys.forEach((key, i) => {
          if (i > 0) languages += ', ';
          languages += this.languages[key];
        });
        return languages;
      },
    },
    props: [
      'area',
      'capital',
      'continents',
      'currencies',
      'languages',
      'population',
      'subregion'
    ]
  }
</script>