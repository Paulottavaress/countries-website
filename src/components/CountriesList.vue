<template>
  <div>
    <h1>{{ listTitle }}</h1>
    <DataView :value="countries">
      <template #list="slotProps">
        <CountryItem
          :name="slotProps.data.name.common"
          :flag-name="slotProps.data.flags.png"
          :flag-description="slotProps.data.flags.alt"
        />
      </template>
    </DataView>
  </div>
</template>

<script>
import CountryItem from './CountryItem.vue';
import DataView from 'primevue/dataview';

export default {
  components: {
    CountryItem,
    DataView
  },
  name: 'CountriesList',
  props: [
    'countries',
    'listTitle'
  ]
}
</script>

<style scoped lang="scss">
</style>
