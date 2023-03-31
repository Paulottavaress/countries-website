<template>
  <div v-if="countries.length > 0">
    <h1>{{ listTitle }}</h1>
    <span class="p-input-icon-left pb-2 pr-2">
      <i class="pi pi-search" />
      <InputText v-model='insertedName' placeholder='Search by name' />
    </span>
    <span class="p-input-icon-left pb-2 pr-2">
      <i class="pi pi-search" />
      <InputText v-model='insertedRegion' placeholder='Search by region' />
    </span>
    <DataView :value="filteredCountries">
      <template #list="slotProps">
        <CountryItem
          :name="slotProps.data.name.common"
          :flag-name="slotProps.data.flags.png"
          :flag-description="slotProps.data.flags.alt"
        />
      </template>
    </DataView>
  </div>
  <ProgressSpinner v-else/>
</template>

<script>
import CountryItem from './CountryItem.vue';
import DataView from 'primevue/dataview';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: {
    CountryItem,
    DataView,
    InputText,
    ProgressSpinner
  },
  data() {
    return {
      insertedName: '',
      insertedRegion: '',
      filteredCountries: []
    }
  },
  methods: {
    filterCountries() {
      this.filteredCountries = this.countries.filter(country => country.name.common.toLowerCase().includes(this.insertedName.toLowerCase()));
      this.filteredCountries = this.filteredCountries.filter(country => country.region.toLowerCase().includes(this.insertedRegion.toLowerCase()));
    }
  },
  name: 'CountriesList',
  props: [
    'countries',
    'listTitle'
  ],
  watch: {
    countries() {
      this.filteredCountries = this.countries;
    },
    insertedName() {
      this.filterCountries();
    },
    insertedRegion() {
      this.filterCountries();
    }
  }
}
</script>

<style scoped lang="scss">
</style>
