<template>
  <div class="main">
    <div class="center-content">
      <div class="leaflet-map-content">
        <div class="top-header">
          <div class="header-text"> 哪儿 </div>
          <div class="header-button"> <mt-button type="primary" size="small" plain>踩踩</mt-button> </div>
        </div>
        <leaflet-map></leaflet-map>
      </div>
      <div class="detail-mask-content" v-show="detail_mask_visible">
        <detail-mask></detail-mask>
      </div>
    </div>
  </div>
</template>

<script>
    import LeafletMap from '../uielements/LeafletMap.vue'
    import DetailMask from '../uielements/DetailMask.vue'
    import reqwest from 'reqwest'

    const direct_city = ['北京市', '天津市', '上海市', '重庆市'];
    let thiz;
    export default {
      name: "where",    // 哪儿
      data () {
        return {
          init_map_data: null,
          init_content_data: null,
          data_url: '/get',
          detail_mask_visible:false,
        };
      },
      mounted() {
        thiz = this;
        this.fetchData(this.data_url);
        this.initListenMsg();
      },
      methods: {
        fetchData(url) {
          // select all users
          // this.$http.get(url).then((response) => {
          //   this.init_map_data = response.data;
          //   this.dataInit();
          // });

          reqwest({
            url: 'http://kulturnett2.delving.org/api/search?query=*%3A*&format=jsonp&rows=100&pt=59.936%2C10.76&d=1&qf=abm_contentProvider_text%3ADigitaltMuseum',
            type: 'jsonp',
            success: function (data) {
              thiz.init_map_data = data.result;
              thiz.dataInit();
            }
          });
        },

        fetchDetailData(){

        },

        initListenMsg() {
          this.$bus.$on('area-select-update', (select_area) => {
            this.filterSelectData(select_area);
          });

          this.$bus.$on('show_detail_mask',(photo_data) => {
            this.detail_mask_visible = true;
          });

          this.$bus.$on('close_detail_mask',(photo_data) => {
            this.detail_mask_visible = false;
          });
        },

        filterSelectData(select_area) {
          // select all province
          if( select_area.province === 'all' ) {
            this.notifyDataUpdate(this.init_map_data);
            return;
          }

          let province_list = [];
          let city_list = [];

          // filter province
          for(let el of this.init_map_data.features) {
            let properties = el.properties;
            if( properties.province === select_area.province ) {
              province_list.push(el);
            }
          }

          // filter city:
          if(select_area.city !== "all") {
            for(let el of province_list) {
              let city_name = null;
              // 分离是否为直辖市
              if (direct_city.indexOf(select_area.province) === -1) {
                city_name = el.properties.city
              }
              else {
                city_name = el.properties.district
              }

              // 过滤本市数据
              if (city_name === select_area.city) {
                city_list.push(el)
              }
            }
          }
          else {
            city_list = province_list;
          }

          let new_geojson_data = {
            type: "FeatureCollection",
            features: city_list
          };

          this.notifyDataUpdate(new_geojson_data);
        },

        dataInit() {
          this.$bus.$emit('map-data-init', this.init_map_data);
        },

        notifyDataUpdate(data) {
          this.$bus.$emit('map-data-update', data);
        },
      },
      components: { LeafletMap, DetailMask },
    }
</script>

<style scoped>

  .center-content{
    position: relative;
    height: 100%;
    width: 100%;
  }

  .top-header{
    height: 50px;
    width: 100%;
    background: #eaeaea;
  }

  .header-text{
    padding-top: 10px;
    font-size: 20px;

  }

  .header-button {
    position: absolute;
    right: 5px;
    top: 10px
  }

  .leaflet-map-content,.detail-mask-content{
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .detail-mask-content{
    z-index: 9999;
  }

</style>
