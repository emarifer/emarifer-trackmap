<template>

    <!-- Dialog: Track Info -->
    <v-dialog v-model="dialogInfo" width="450">
        <v-card>
          <v-toolbar color="purple darken-3" dark dense flat>
            <v-toolbar-title class="text-body-2">
              <v-icon class="mr-2">mdi-information-outline</v-icon>
              Track Info
            </v-toolbar-title>
          </v-toolbar>
            
          <v-card-text class="mt-6">
            <ul v-if="gpxLoaded">
              <li><strong>Nombre: </strong>{{ name }}</li>
              <li><strong>Distancia: </strong>{{ distance }}</li>
              <li><strong>Máxima elevación: </strong>{{ maxElevation }}</li>
              <li><strong>Duración: </strong>{{ time }}</li>
            </ul>
            <p v-else class="ml-4"><strong>No hay Track cargado!! 🙁</strong></p>
          </v-card-text>
          
          <v-card-actions class="px-10">
            <v-spacer/>
            <v-icon large @click="closeDialog">
              mdi-close-box
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>

    export default {
        name: 'DialogInfo',
        props: {
            dialogInfo: {
                type: Boolean,
                default: false,
            },
            gpxLoaded: {},
            name: {
                type: String,
            },
            distance: {
                type: String,
            },
            maxElevation: {
                type: String,
            },
            time: {
                type: String,
            }
        },
        methods: {
            closeDialog() {
                this.$emit('close_dialog');
            }
        },
    }
</script>