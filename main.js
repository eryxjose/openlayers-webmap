
window.onload = init; // garante que o javascript seja executado após carregamento completo do documento html

// map controls
const fullScreenControl = new ol.control.FullScreen();
const mousePositionControl = new ol.control.MousePosition();
const overViewMapControl = new ol.control.OverviewMap({
    collapsed: true,
    layers: [ // necessário para exibir layer dentro do overlay
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});
const scaleLineControl = new ol.control.ScaleLine();
const zoomSliderControl = new ol.control.ZoomSlider();
const zoomToExtentControl = new ol.control.ZoomToExtent();

function init() {
    
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: "js-map",
    });
    
}