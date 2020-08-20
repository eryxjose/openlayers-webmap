
window.onload = init; // garante que o javascript seja executado após carregamento completo do documento html

function init() {
    
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),  // Open Street Map - https://www.openstreetmap.org
                zIndex: 1,
                visible: true, 
                extent: [] // define a extensão da área visível utilizando: minx miny maxx, maxy
            }),
        ],
        target: "js-map",
    });

    // Layer Group
    const layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    // layer OMS Humanitarian
                    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
                    zIndex: 0,
                    visible: true // default true
                })
            })
        ]
    });

    map.addLayer(layerGroup);
    
}