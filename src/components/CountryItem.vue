<template>
  <Card>
    <template #title>{{ name }}</template>
    <template #content>
      <img :src="flagName" :alt="flagDescription">
    </template>
    <template #footer>
      <Button @click="redirect">Learn more</Button>
    </template>
  </Card>
</template>
<script>
  import Card from 'primevue/card';
  import Button from 'primevue/button';

  export default {
    components: {
      Card,
      Button
    },
    methods: {
      redirect() {
        this.$router.push({ name: 'country', params: { countryName: this.name }});
      }
    },
    name: 'CountryItem',
    props: [
      'name', 
      'flag-name', 
      'flag-description'
    ]
  }
</script>