<template>

    <!-- Dialog: Remove Cache Map -->
    <v-dialog v-model="dialogRemoveCache" width="400">
        <v-card>
          <v-toolbar color="purple darken-3" dark dense flat>
            <v-toolbar-title class="text-body-2">
              <v-icon class="mr-2">mdi-map</v-icon>
              Deseas borrar la caché de Mapas?
            </v-toolbar-title>
          </v-toolbar>
  
          <v-card-text class="mt-4">
            <p class="ml-1"><strong>Si no tienes red no podrás ver mapas!! 🙁</strong></p>
          </v-card-text>

          <v-card-actions class="px-10">
            <v-btn @click="removeCache" small color="pink" text>Borrar</v-btn>
            <v-spacer/>
            <v-btn small @click="closeDialogRemoveCache" color="light-blue darken-2" text>No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>

    export default {
        name: 'DialogRemoveCache',
        props: {
            dialogRemoveCache: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            removeCache() {
                this.$emit('remove_cache');
            },
            closeDialogRemoveCache() {
                this.$emit('close_dialog_remove_cache');
            },
        },
    }
</script>