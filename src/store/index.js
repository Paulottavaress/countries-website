import { createStore } from 'vuex';

export default createStore({
  state: {
    allCountries: '',
    country: null,
    noCountry: false,
    errMsg: null,
    subregionCountries: [],
    noSubregionCountries: false,
    noSubregionCountriesMsg: null,
    borderCountries: [],
    noBorderCountries: false,
    noBorderCountriesMsg: null
  },
  getters: {
    getAllCountries(state) {
      return state.allCountries;
    },
    getCountry(state) {
      return state.country;
    },
    getNoCountry(state) {
      return state.noCountry;
    },
    getErrMsg(state) {
      return state.errMsg;
    },
    getSubregionCountries(state) {
      return state.subregionCountries;
    },
    getNoSubregionCountries(state) {
      return state.noSubregionCountries;
    },
    getNoSubregionCountriesMsg(state) {
      return state.noSubregionCountriesMsg;
    },
    getBorderCountries(state) {
      return state.borderCountries;
    },
    getNoBorderCountries(state) {
      return state.noBorderCountries;
    },
    getNoBorderCountriesMsg(state) {
      return state.noBorderCountriesMsg;
    }
  },
  mutations: {
    setAllCountries(state, payload) {
      state.allCountries = payload;
    },
    successCountry(state, payload) {
      state.country = payload;
    },
    failureCountry(state, payload) {
      state.noCountry = true;
      state.errMsg = payload
    },
    successSubregionCountries(state, payload) {
      state.subregionCountries = payload.filter(country => country.name.common !== state.country.name.common);
    },
    failureSubregionCountries(state, payload) {
      state.noSubregionCountries = true;
      state.noSubregionCountriesMsg = payload;
    },
    successBorderCountries(state, payload) {
      state.borderCountries = payload;
    },
    failureBorderCountries(state, payload) {
      state.noBorderCountries = true;
      state.noBorderCountriesMsg = payload;
    }
  },
  actions: {
    setAllCountries(context) {
      fetch('https://restcountries.com/v3.1/all?fields=name,flags,region')
        .then(res => {
          return res.json();
        }).then(countries => {
          context.commit('setAllCountries', countries);
        }).catch(err => {
          console.log('err', err)
        });
    },
    setCountry(context, payload) {
      fetch('https://restcountries.com/v3.1/name/' + payload)
        .then(res => {
          return res.json();
        }).then(data => {
          if (data.status && data.status === 404) context.commit('failureCountry', 'No country with this name was found!');
          else context.commit('successCountry', data[0]);
        }).catch(() => {
          context.commit('failureCountry', 'An error occurred. Please try again later!');
        });
    },
    setSubregionCountries(context, payload) {
      fetch('https://restcountries.com/v3.1/subregion/' + payload)
        .then(res => {
          return res.json();
        }).then(data => {
          if (data.status && data.status === 404) context.commit('failureSubregionCountries', 'There is no other country in this subregion!');
          else context.commit('successSubregionCountries', data);
        }).catch(() => {
          context.commit('failureSubregionCountries', 'An error occurred. Please try again later!');
        }); 
    },
    setBorderCountries(context, payload) {
      fetch('https://restcountries.com/v3.1/alpha?codes=' + payload)
      .then(res => {
        return res.json();
      }).then(data => {
        if (data.status && data.status === 404) context.commit('failureBorderCountries', 'This country does not have border countries!');
        else context.commit('successBorderCountries', data);
      }).catch(() => {
        context.commit('failureBorderCountries', 'This country does not have border countries!');
      })
    },
    setNoBorderCountry(context) {
      context.commit('failureBorderCountries', 'This country does not have border countries!');
    }
  }
})
