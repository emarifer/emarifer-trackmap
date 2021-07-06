<template>
    <v-container class="custom-background" fluid>        

        <!-- Row: Track load / unload Controls -->
        <v-row justify="center" class="my-3 px-6" align="center">
            <label for="input-track">
                <v-icon class="mr-1" color="white">mdi-paperclip</v-icon>
                Seleccionar Track…
            </label>
            <input ref="fileuploader" type="file" accept="application/gpx+xml"  @click="resetFileUploader" @change="openFile" id="input-track">
            <v-icon @click="removeTrack" class="ml-3" color="white">mdi-delete</v-icon>
        </v-row>

        <!-- Row: Info, Navigation & Cache Maps Controls -->
        <v-row justify="center" align="center" class="my-3">
            <v-btn class="sizeFab mr-10" fab color="blue lighten-1" dark @click="dialogInfo=true">
                <v-icon>mdi-information</v-icon>
            </v-btn>

            <v-btn class="sizeFab mr-10" fab :color="colorNavigation" dark @click="checkLocation">
                <v-icon>mdi-map-marker-radius</v-icon>
            </v-btn>            
            
            <v-btn class="sizeFab" fab color="pink" dark @click="dialogRemoveCache=true">
                <v-icon small>mdi-cached</v-icon>
                <v-icon small>mdi-map</v-icon>
            </v-btn>
        </v-row>

        <!-- Row: Map Display -->
        <v-row class="map-row">
            <div id="map"></div>
        </v-row>
        
        <!-- Dialog: Track Info -->
        <DialogInfo
            :dialogInfo="dialogInfo"
            v-on:close_dialog="onClose"
            :gpxLoaded="gpxLoaded"
            :name="name"
            :distance="distance"
            :maxElevation="maxElevation"
            :time="time" />

        <!-- Dialog: Remove Cache Map -->
        <DialogRemoveCache
            :dialogRemoveCache="dialogRemoveCache"
            v-on:close_dialog_remove_cache="onCloseDialogRemoveCache"
            v-on:remove_cache="removeCache" />

        <!-- Snackbar: Update Notice -->
        <v-snackbar bottom right :value="updateExists" :timeout="-1" color="grey darken-3">
            Actualización disponible!! 😀
            <v-btn @click="refreshApp" color="white" class="ml-5">
                <img src="gif/icons8-refresh.gif" height="27" alt="Refresh">
            </v-btn>
        </v-snackbar>

    </v-container>
</template>

<style scoped>

    .custom-background {
        height: 100%;
        background-color: #1D2125;
    }

    #input-track {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }

    label {
        color: white;
        background-color: #ffffff80;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
    }

    #map {
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .map-row {
        height: 80vh;
    }

    .sizeFab {
        width: 2.75rem !important;
        height: 2.75rem !important;
    }
</style>

<script>
    import DialogInfo from '@/components/DialogInfo';
    import DialogRemoveCache from '@/components/DialogRemoveCache';
    import update from '@/mixins/update';
    import handlers from '@/mixins/handlers';

    export default {
        name: 'MyMap',
        components: {
            DialogInfo,
            DialogRemoveCache,
        },
        data() {
            return {
                map: null,
                gpxLoaded: null,
                name: '',
                distance: '',
                maxElevation: '',
                time: '',
                colorNavigation: 'teal accent-4',
                locationActive: false,
                marker: null,
                circles: null,
                dialogInfo: false,
                dialogRemoveCache: false,
            }
        },
        mixins: [update, handlers],
        mounted() {
            this.resetMarkerIcon();

            this.initMap();

            // Redraw the track if it exists in LocalStorage when starting the app
            const data = window.localStorage.getItem('gpx');
            if (data && data.length !== 0) {
                this.displayTrack(data);
            };
        },
        methods: {
            onClose() {
                this.dialogInfo = false;
            },
            onCloseDialogRemoveCache() {
                this.dialogRemoveCache = false;
            },
            removeCache() {
                this.removeCacheMap();
                this.dialogRemoveCache = false;
            },
        },
    }

</script>

<!-- 
    PASAR DATOS DEL COMPONENTE HIJO AL PADRE. VER:
    https://es.stackoverflow.com/questions/308080/vue-retornar-informaci%C3%B3n-de-un-componente-hijo-al-padre-por-propiedades
 -->