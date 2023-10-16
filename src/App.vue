<script>
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

export default {
    
}

</script>

<template>
    <div>
    <v-layout>
        <v-navigation-drawer
          permanent
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="Chess Board"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item
                prepend-icon="mdi-home-city"
                title="Home"
                value="home"
            ></v-list-item>
           
            <v-list-item
                prepend-icon="mdi-account"
                title="My Account"
                value="account"
            ></v-list-item>
            <router-link to="/board">
                <v-list-item
                    prepend-icon="mdi-account-group-outline"
                    title="Board"
                    value="Board"
                ></v-list-item>
            </router-link>
            <router-link to="/admin">
                <v-list-item
                prepend-icon="mdi-account-tie"
                title="Admin"
                value="admin"
                ></v-list-item>
            </router-link>
          </v-list>
        </v-navigation-drawer>
            <!-- <v-main> -->
            <div class="main">
                <router-view>
                </router-view>
            </div>
            <!-- </v-main> -->
      </v-layout>
    </div>
</template>

<style>
</style>