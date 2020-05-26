<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png">
    <HelloWorld msg="Vue Karhoo Quotes Demo App!" />

    <div>
      <div>Loading: {{ loading }}</div>
      <button @click="onRequest()">Request quotes</button>
      <button @click="onStop()">Stop requsting quotes</button>
      <h3 v-if="items.length"> Matching Quotes </h3>
      <div v-for="item in items" v-bind:key="item.id" id="item">
        <img :src="item.fleetLogo" id="image" />
        <div>
          {{ item.fleetName }}
          <div>
            🧳x {{ item.vehicleLuggageCapacity }} {{ ' ' }}
            🧑‍🦰x {{ item.vehiclePassengerCapacity }} {{ ' ' }}
            🚎- {{ item.vehicleClass }}
          </div>
        </div>
      </div>
      <h3 v-if="nonItems.length"> Other Quotes </h3>
      <div v-for="item in nonItems" v-bind:key="item.id" id="item">
        <img :src="item.fleetLogo" id="image" />
        <div>
          {{ item.fleetName }}
          <div>
            🧳x {{ item.vehicleLuggageCapacity }} {{ ' ' }}
            🧑‍🦰x {{ item.vehiclePassengerCapacity }} {{ ' ' }}
            🚎- {{ item.vehicleClass }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuotesBloc } from 'demand-bloc-quotes';
import { getApi } from '@karhoo/demand-api';
import HelloWorld from './components/HelloWorld.vue';

const api = getApi({
  url: 'api',
  defaultRequestOptionsGetter: () => ({
    headers: {
      identifier: 'BQ0AAgUECgwHBQMFBAgHAABAMJCAACCw',
      referrer: 'https://traveller.sandbox.karhoo.com/',
    },
  }),
});

const quotesSearchParams = {
  originPlaceId: 'ChIJU2AA5x1w5kcRC48bRJIMSAA',
  destinationPlaceId: 'ChIJiQxv_05u5kcRESFIh6-QTvQ',
  localTimeOfPickup: '2020-06-29T12:00',
};

const bloc = new QuotesBloc(api.quotesService);

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    bloc,
    items: [],
    nonItems: [],
    loading: false,
  }),
  methods: {
    onRequest() {
      this.bloc.filters = {
        numOfLuggage: 2,
        numOfPassengers: 3,
      };

      this.bloc.loading.subscribe((loading) => {
        this.loading = loading;
      });

      this.bloc.matchingQuotes.subscribe((data) => {
        this.items = data;
      });

      this.bloc.otherAvailibleQuotes.subscribe((data) => {
        this.nonItems = data;
      });

      this.bloc.requestQuotes(quotesSearchParams);
    },

    onStop() {
      this.bloc.stopRequestingQuotes();
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#item {
  border: 1px solid #e67e22;
  border-radius: 5px;
  margin: 10px auto 0;
  padding: 10px;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#image {
  width: 60px;
}
</style>
