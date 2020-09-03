
window.onload = init; // garante que o javascript seja executado após carregamento completo do documento html

// Custom Attribution
const attributionControl = new ol.control.Attribution({
    collapsible: true
});

function init() {
    
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 3
        }),
        target: 'js-map',
        controls: ol.control.defaults({attribution: false}).extend([attributionControl])
    });

    const osmStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true, 
        title: 'OSMStandard'
    });

    const osmHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
        }),
        visible: false,
        title: 'OSMHumanitarian'
    });

    const bindMaps = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: 'YOUR-BINGAPI-KEY', // Crie sua chave em bingmapsportal.com 
            imagerySet: 'CanvasGray'
        }),
        visible: false,
        title: 'BingMaps'
    });

    const cartoDBBase = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png',
            // Attribution para CartoDB obtido na documentação 
            attributions: '@ CARTO'
        }),
        visible: false,
        title: 'CartoDarkDB'
    });

    const stamenBaseLayer = new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'terrain-labels',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        title: 'StamenTerrainWithLabels'
    });

    // Base Vector Layers - https://cloud.maptiler.com/maps/
    
    const osmVectorTile = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
            url: 'https://api.maptiler.com/tiles/v3-4326/{z}/{x}/{y}.pbf?key=SKmV0MT53ryiZlIU0KPg',
            format: new ol.format.MVT(),
            attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }),
        visible: false,
        title: 'VectorTileLayerOsm'
    });

    // Base Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            osmStandard, osmHumanitarian, bindMaps, cartoDBBase, stamenBaseLayer, osmVectorTile
        ]
    });
    map.addLayer(baseLayerGroup);
    
    // Base layer change event handler
    const baseLayerElements = document.getElementsByName("baseLayerRadioButton");
    for(let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function() {
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array) {
                let baseLayerName = element.get('title');
                element.setVisible(baseLayerName === baseLayerElementValue);
            });
        });
    }

    // Debug Layer
    const tileDebugLayer = new ol.layer.Tile({
        source: new ol.source.TileDebug(),
        visible: false,
        title: 'TileDebugLayer'
    });

    // ArcGIS Layer Rest API
    const tileArcGisLayer = new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
            //url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
            url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer?f=json",
            attribution: '(c) ESRI and its data partners'
        }),
        visible: false,
        title: 'TileArcGISLayer'
    });

    // NOAA WMS Layer
    const noaaWmsLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer",
            params: {
                LAYERS: 1,
                FORMAT: 'image/png',
                TRANSPARENT: true
            },
            attributions: '<a href=https://nowcoast.noaa.gov/>@ NOAA</a>'
        }),
        visible: false,
        title: 'NOAAWMSLayer'
    });

    // Static Image OSM
    const osmStaticImage = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './data/static_images/static-image-1.png',
            imageExtent: [-9985427.627062285, -5019161.025317814, -5015186.299846984, 9783.939620502293],
            attribution: '<a href=https://www.openstreetmap.org/copyright/>OpenStreetMap</a>'
        }),
        title: 'OsmStaticImage',
        visible: false
    });


    // Heatmap
    const heatMapOnlineApp1Users = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: './data/vector_data/onlineApp1Users.json',
            format: new ol.format.GeoJSON()
        }),
        radius: 15,
        blur: 10,
        visible: false,
        title: 'onlineApp1Users'
    });


    // Layer Group
    const rasterLayerGroup = new ol.layer.Group({
        layers: [
            tileDebugLayer, tileArcGisLayer, noaaWmsLayer, osmStaticImage, heatMapOnlineApp1Users
        ]
    });
    map.addLayer(rasterLayerGroup);

    const tileRasterLayerElements = document.getElementsByName('rasterLayerCheck');
    for(let tileRasterLayerElement of tileRasterLayerElements) {
        tileRasterLayerElement.addEventListener('change', function() {
            let tileRasterLayerElementValue = this.value;
            let tileRasterLayer;

            rasterLayerGroup.getLayers().forEach(function(element, index, array) {
                debugger;
                if (tileRasterLayerElementValue === element.get('title')) {
                    tileRasterLayer = element;
                }
            });

            this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false);
        });
    }

    // Setter Attributions
    //NOAAWMSLayer.getSource().setAttributions('<a href="https://nowcoast.noaa.gov/">NOAA</a>');

    // EventHandler sample
    map.on('click', function(e) {
        console.log(e.coordinate);
    });
    
}