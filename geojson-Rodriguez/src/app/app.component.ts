import { Component } from '@angular/core';
import { GEOJSON, GeoFeatureCollection } from './models/geojson.model';
import { Marker } from './models/marker.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-maps';
  // google maps zoom level
  zoom: number = 8;
  geoJsonObject : GeoFeatureCollection; //Oggetto che conterrà il vettore di GeoJson
  fillColor: string = "#FF0000";  //Colore delle zone catastali
  markers: Marker[];  //Vettore con tutti i marker

  lng: number = 9.02657833507687;
  lat: number = 45.512051524024308;

  constructor() {
    //Questi dati dovremmo scaricarli dal server, per ora li abbiamo copiati nel file geojson.model.ts
    this.geoJsonObject = GEOJSON;
    console.log(this.geoJsonObject); //stampo l'oggetto geoJsonObject sulla console
    console.log(Array(1)); //visualizzo le coordinate prima features
  }



  styleFunc = (feature) =>{
    console.log(feature.i.id) //mostra id dei poligoni della classe geojson.model.ts
    let newColor = "#FF0000"; //RED    variabile che contiene il colore rosoo
    if(feature.i.id == 0) newColor = "#00FF00"; //GREEN     se id==0 sarà di colore verdela zona catastale
    else newColor = "#0000FF"; //BLUE   se no sarà blu
    return ({
      clickable: false,     //se viene cliccato non succede niente
      fillColor: newColor,   //viene riempito con il colore scelto
      strokeWeight: 1   //grandezza del contorno della zona catastale
    });
  }





  ngOnInit() {
    /*this.markers = [];
    for (let feature of  this.geoJsonObject.features)
    {
      queste due righe ci avevo pensato
      guardando questo commento -> questo coordinates[0][0][0] ottiene la longitudine)
      let lng = feature.geometry.coordinates[0][0][0];
      let lat = feature.geometry.coordinates[0][0][1];


      let id = String(this.geoJsonObject.features[0].properties.id);
      let marker : Marker = new Marker(lat, lng, id);
      this.markers.push(marker);
    }*/

    this.markers = [
      {
        //features[0] seleziona il primo geoJson
        //coordinates[0] ottiene la lista di poligoni.
        //coordinates[0][0] ottiene il primo (e unico) poligono della lista
        //coordinates[0][0][0] ottiene la longitudine
        //coordinates[0][0][1] ottiene la latitudine
        lng: this.geoJsonObject.features[0].geometry.coordinates[0][0][0],
        lat: this.geoJsonObject.features[0].geometry.coordinates[0][0][1],
        label: String(this.geoJsonObject.features[0].properties.id),
      },
      {
        lng: this.geoJsonObject.features[1].geometry.coordinates[0][0][0],
        lat: this.geoJsonObject.features[1].geometry.coordinates[0][0][1],
        label: String(this.geoJsonObject.features[1].properties.id),
      }
    ]
  }


}
