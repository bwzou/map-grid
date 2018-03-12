<template>
  <div id="leaflet-map"  ></div>
</template>

<script>
    import Leaflet from 'leaflet'
    import markerClusterGroup from 'leaflet.markercluster'
    import mapProvider from '../utilities/leaflet.MapProviders.js'
    import photo from '../utilities/Leaflet.Photo.js'
    import easyButton from '../utilities/leaflet.EasyButton.vue'

    // const MAP_IMAGE_PATH = "/assets/images/leaflet/";
    let thiz;
    export default {
        name:'leaflet-map',
        data() {
          return {
            map: null,
            photoLayer: null,
            init_map_data: null,
            reset_btn: null,
            map_config: {
              zoom: 4,
              center: [37.5, 106],
              minZoom: 3,
              maxZoom: 18,
              attribution: "&copy; 高德地图",
            },
          };
        },

        mounted() {
          document.getElementById('leaflet-map').style.height = document.documentElement.clientHeight - 105 + 'px';
          window.onresize = (ev) => {
            document.getElementById('leaflet-map').style.height = document.documentElement.clientHeight - 105 + 'px';
          };
          thiz = this;
          this.initMap();
          this.addMapLayer();
          this.addMapBtn();
          this.initListenMsg();
        },

        methods: {
          initMap() {
            // need set default L.Icon.Default.imagePath
            // L.Icon.Default.imagePath = MAP_IMAGE_PATH;

            this.map = L.map("leaflet-map",{
              center: this.map_config.center,
              zoom: this.map_config.zoom,
              minZoom: this.map_config.minZoom,
              maxZoom: this.map_config.maxZoom,
              // scrollWheelZoom: false,
            });

            this.map.on("zoomend", (event) => {
              if(this.reset_btn && this.map.getZoom() !== this.map_config.zoom) {
                this.reset_btn.enable();
              }
            })
          },

          addMapLayer() {
            L.tileLayer.mapProvider('GaoDe.Normal.Map',
              {attribution: this.map_config.attribution}).addTo(this.map);
          },

          addMapBtn() {
            // add rest button
            this.reset_btn = L.easyButton('fa-refresh', () => {
              this.$bus.$emit('map-data-reset');
            });
            this.reset_btn.addTo(this.map);
            this.reset_btn.disable();
          },

          addClusterLayer(resp) {
            if ( resp && resp.items ) {
              // clear pervious layer
              if(this.photoLayer) {
                this.photoLayer.clearLayers();
              }

              this.photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 5})
                .on('click', function (evt) {
                  evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
                    className: 'leaflet-popup-photo',
                    minWidth: 350
                  }).openPopup();
                });

              let photos = [];
              let data = resp.items;
              for (let i = 0; i < data.length; i++) {
                let photo = data[i].item.fields;
                if (photo.abm_latLong) {
                  let pos = photo.abm_latLong[0].split(',');
                  photos.push({
                    lat: pos[0],
                    lng: pos[1],
                    url: photo.delving_thumbnail[0],
                    caption: (photo.delving_description ? photo.delving_description[0] : '') + ' - Kilde: <a href="' + photo.delving_landingPage + '">' + photo.delving_collection + '</a>',
                    thumbnail: photo.delving_thumbnail[0]
                  });
                }
              }

              thiz.photoLayer.add(photos).addTo(thiz.map);
            }
          },

          updateMapData(map_data) {
            if(map_data.items !== 0) {
              this.addClusterLayer(map_data);
              this.map.fitBounds(this.photoLayer.getBounds());
            }
          },

          initListenMsg() {
            this.$bus.$on('map-data-init', (map_data) => {
              this.init_map_data = map_data;
              this.updateMapData(this.init_map_data);
            });

            this.$bus.$on('map-data-update', (map_data) => {
              this.updateMapData(map_data);

              // enable reset button
              if(this.reset_btn) {
                this.reset_btn.enable();
              }
            });

            this.$bus.$on('map-data-reset', () => {
              if(this.init_map_data !== null) {
                this.updateMapData(this.init_map_data);
              }
              // disable reset button
              if(this.reset_btn) {
                this.reset_btn.disable();
              }
            });
          },
        }
    }
</script>

<style>
  #leaflet-map {
    width: 100%;
    height: 810px;
  }

  /* icon style */
  #leaflet-map .easy-button-button {
    border: none;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
  }

  #leaflet-map .easy-button-button .fa {
    vertical-align: 0;
    font-size: 1.3em;
  }

  @media (max-width: 768px) {
    #leaflet-map {
      height: 535px;
    }
  }
</style>
