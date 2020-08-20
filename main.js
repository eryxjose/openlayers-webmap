
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
                extent: [-8484041.31321263, -4018303.98758232, -3816343.3818971664, 751049.7970467284], 
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
                extent: [-8484041.31321263, -4018303.98758232, -3816343.3818971664, 751049.7970467284], 
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
        })
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
        visible: true
    });
    map.addLayer(stamenBaseLayer);

    
    map.on('click', function(e) {
        console.log(e.coordinate);
    });
    
}