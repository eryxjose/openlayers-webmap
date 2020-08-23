
window.onload = init; // garante que o javascript seja executado após carregamento completo do documento html

function init() {
    
    const map = new ol.Map({
        view: new ol.View({
            center: [-5885039.681732291, -1139828.9657885488],
            zoom: 5,
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),  // Open Street Map - https://www.openstreetmap.org
                zIndex: 1,
                visible: true, 
                // define a extensão da área visível utilizando: minx miny maxx, maxy
                opacity: 0.5
            }),
            
        ],
        target: "js-map",
    });

    // Layer Group
    const layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                visible: true, // default true
                // provavelmente os extents dos layers serão os mesmos
                opacity: 0.5,
                source: new ol.source.OSM({
                    // layer OSM Humanitarian
                    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
                    zIndex: 0,
                })
            })
        ]
    });
   map.addLayer(layerGroup);

    // CartoDB BaseMap Layer
    const cartoDBBaseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png'
        }),
        visible: false
    });
    map.addLayer(cartoDBBaseLayer);


    // Debug Layer
    const tileDebugLayer = new ol.layer.Tile({
        source: new ol.source.TileDebug(),
        visible: false
    });
    map.addLayer(tileDebugLayer);


    // Stamen Basemap Layer
    const stamenBaseLayer = new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'terrain-labels'
        }),
        
        // Alternativa utilizando url 
        // source: new ol.source.XYZ({
        //     url: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
        // }),

        visible: false
    });
    map.addLayer(stamenBaseLayer);

    // ArcGIS Layer Rest API
    const tileArcGISLayer = new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
            url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer"
        }),
        visible: true
    })
    map.addLayer(tileArcGISLayer);

    // NOAA WMS Layer
    const NOAAWMSLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer",
            params: {
                LAYERS: 1,
                TRANSPARENT: true
            }
        })
    });
    map.addLayer(NOAAWMSLayer);

    // Setter Attributions
    NOAAWMSLayer.getSource().setAttributions('<a href="https://nowcoast.noaa.gov/">NOAA</a>');

    map.on('click', function(e) {
        console.log(e.coordinate);
    });
    
}