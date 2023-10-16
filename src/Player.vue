<template>
    <v-app dark>
      <v-content>
        <v-container>
          <player-title-bar></player-title-bar> // ADD the component in the template
        </v-container>
      </v-content>
    </v-app>
  </template>
  <script>
    import PlayerTitleBar from './components/PlayerTitleBar.vue' // IMPORT the component 
    export default {
      components: {
        PlayerTitleBar // REGISTER the component 
      },
      data () {
        return {
        }
      }
    }
  </script>