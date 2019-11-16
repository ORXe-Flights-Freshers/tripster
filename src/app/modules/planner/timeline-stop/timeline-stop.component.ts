import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HelperCanvas} from './helper-functions';
import {Stop} from '@models/Stop';
import {TripService} from '@services/trip.service';
import {Hotel} from '@models/Hotel';
import {Attraction} from '@models/Attraction';
import {UtilityService} from '@services/utility.service';
import {Subscription} from 'rxjs';

interface TimelinePlace {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  arrivalTime: Date;
  departureTime: Date;
}

@Component({
  selector: 'app-timeline-stop',
  templateUrl: './timeline-stop.component.html',
  styleUrls: ['./timeline-stop.component.css']
})
export class TimelineStopComponent implements OnInit, AfterViewInit, OnDestroy {
  static canvasDefaultHeight = 90;

  get DefaultCanvasHeight() {
    return TimelineStopComponent.canvasDefaultHeight;
  }

  @Input() stop: Stop;
  @Input() stopType = 'stop';

  @ViewChild('canvasContainer', {static: false}) canvasContainerTemplate: ElementRef<HTMLDivElement>;

  stopSubscription: Subscription;

  arrivalDate: Date;
  departureDate: Date;
  helperCanvas: HelperCanvas;
  canvasElement: HTMLCanvasElement;
  stopLabelYCoordinate = 45;
  placesHeightOffset = 45;
  places: TimelinePlace[];
  buttons = {
    deleteHover: false,
    deletePlaces: []
  };
  iconsBaseUrl = 'assets/icons/';
  mapped: {
    width: number,
    height: number
  };

  darkTheme = {
    name: 'dark',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'rgb(255, 255, 255)',
    stopSeparatorColor: 'rgb(0, 0, 0)',
    dateColor: 'rgb(127, 127, 127)',
    sourceAndDestinationDateBackgroundColor: 'rgb(25, 25, 25)',
    sourceAndDestinationDateBorderColor: 'rgb(20, 20, 20)',
    placesMarkerColor: 'light'
  };

  lightTheme = {
    name: 'light',
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(0, 0, 0)',
    stopSeparatorColor: 'rgb(255, 255, 255)',
    dateColor: 'rgb(32, 32, 32)',
    sourceAndDestinationDateBackgroundColor: 'rgb(252, 252, 252)',
    sourceAndDestinationDateBorderColor: 'rgb(240, 240, 240)',
    placesMarkerColor: 'dark'
  };

  currentTheme;

  constructor(public tripService: TripService,
              public utilityService: UtilityService) {
    this.currentTheme = this.lightTheme;
  }

  ngOnInit() {
    this.updateDates();
    this.buildPlaces();
  }

  ngOnDestroy() {
    this.stopSubscription.unsubscribe();
  }

  updateDates() {
    this.arrivalDate = new Date(this.stop.arrival);
    this.departureDate = new Date(this.stop.departure);
  }

  buildPlaces() {
    this.places = [];

    this.stop.hotels.forEach((hotel: Hotel) => {
      this.places.push({
        id: hotel.placeId,
        name: hotel.name,
        type: 'hotel',
        imageUrl: hotel.imageUrl,
        arrivalTime: new Date(hotel.arrival),
        departureTime: new Date(hotel.departure)
      });
    });

    this.stop.attractions.forEach((attraction: Attraction) => {
      this.places.push({
        id: attraction.placeId,
        name: attraction.name,
        type: 'attraction',
        imageUrl: attraction.imageUrl,
        arrivalTime: new Date(attraction.arrival),
        departureTime: new Date(attraction.departure)
      });
    });

    this.places.sort((place1: TimelinePlace, place2: TimelinePlace) => {
      return place1.arrivalTime < place2.arrivalTime ? -1 : 1;
    });

    this.buttons.deletePlaces = [];
    this.places.forEach(() => {
      this.buttons.deletePlaces.push(false);
    });
  }

  buildCanvas() {
    this.canvasContainerTemplate.nativeElement.innerHTML = '';
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.classList.add('body');
    canvas.height = this.DefaultCanvasHeight;
    canvas.innerText = 'Sorry, the timeline can\'t be displayed.\n' +
      '      Your device doesn\'t support canvas rendering.';
    this.canvasElement = canvas;
    this.canvasContainerTemplate.nativeElement.appendChild(canvas);
  }

  editOrRemoveStop() {
    if (this.stopType === 'stop') {
      this.tripService.removeStopFromTrip(this.stop.stopId);
    } else {
      this.tripService.editSourceOrDestination(this.stop, this.stopType);
    }
  }

  deletePlace(placeId: string, placeType: string) {
    this.tripService.deletePlaceFromStop(this.stop.stopId, placeId, placeType);
  }

  ngAfterViewInit() {
    this.buildCanvas();

    this.initializeCanvas();
    this.startRendering();

    this.stopSubscription = this.tripService.stopSubject.subscribe((stop: Stop) => {
      if (this.stop.stopId === stop.stopId) {
        this.stop = stop;
        this.updateDates();
        this.buildPlaces();
        this.buildCanvas();
        this.initializeCanvas();
        this.startRendering();
      }
    });
  }

  initializeCanvas() {
    if (this.places) {
      this.canvasElement.height =
        this.DefaultCanvasHeight + (this.placesHeightOffset * this.places.length);
    }

    this.helperCanvas = new HelperCanvas(this.canvasElement);

    this.mapped = {
      width: this.canvasElement.width / this.helperCanvas.resolution - 1,
      height: this.canvasElement.height / this.helperCanvas.resolution - 1
    };
    console.log(this.mapped.width);
  }

  startRendering() {
    this.renderBackground();
    this.writeStopLabel();
    this.renderStopMarkerConnectorLine();
    this.renderStopMarker();
    this.renderDates();

    if (this.places) {
      this.renderPlaces();
    }
    this.renderStopSeparatorLines();
  }

  renderBackground() {
    this.helperCanvas.drawFilledRect(0, 0,
      this.mapped.width, this.mapped.height,
      this.currentTheme.backgroundColor);
  }

  writeStopLabel() {
    const textWidth =
      this.helperCanvas.canvasContext.measureText(this.stop.name).width;
    const currentFontSize =
      +this.helperCanvas.canvasContext.font.split('px')[0];
    let fontSize = 11;

    if (this.stopType === 'stop') {
      fontSize = 10;
    }

    const outlineRectWidth = (fontSize * (textWidth + 18)) / currentFontSize;

    if (!this.places) {
      this.stopLabelYCoordinate = (this.mapped.height / 2);
    }

    this.helperCanvas.drawFilledRect(
      32, this.stopLabelYCoordinate - 10,
      outlineRectWidth, 20, this.currentTheme.backgroundColor
    );

    this.helperCanvas.drawRoundedRect(
      32, this.stopLabelYCoordinate - 10,
      outlineRectWidth, 20, 10, this.currentTheme.color
    );

    this.helperCanvas.writeText(
      this.stop.name, 40, this.stopLabelYCoordinate + 3,
      fontSize, this.currentTheme.color,
      'bold ' + fontSize + 'px ' + this.helperCanvas.fontFamily
    );
  }

  renderStopMarkerConnectorLine() {
    if (!this.places) {
      this.stopLabelYCoordinate = this.mapped.height / 2;
    }

    const dashParams = [3, 2];

    if (this.stopType !== 'source') {
      this.helperCanvas.drawDashedLine(
        20, 0, 20,
        this.stopLabelYCoordinate, 1, 'grey',
        dashParams
      );
    }

    if (this.stopType !== 'destination') {
      this.helperCanvas.drawDashedLine(
        20, this.stopLabelYCoordinate, 20,
        this.mapped.height, 1, 'grey',
        dashParams
      );
    }

    // Line connecting the markers of the places
    if (this.stopType === 'destination' &&
      this.places.length > 0) {
      this.helperCanvas.drawDashedLine(
        20, this.stopLabelYCoordinate, 20,
        this.mapped.height - 28, 1, 'grey',
        dashParams
      );
    }
  }

  renderStopMarker() {
    let color = 'grey';
    let radius = 3.5;

    if (['source', 'destination'].indexOf(this.stopType) !== -1) {
      color = this.currentTheme.color;
      radius = 5;
    }

    if (!this.places) {
      this.stopLabelYCoordinate = this.mapped.height / 2;
    }

    this.helperCanvas.drawFilledCircle(
      20, this.stopLabelYCoordinate, radius, color
    );
  }

  renderDates() {
    const aDate = this.arrivalDate;
    const dDate = this.departureDate;
    const dateFontSize = 7;
    let dateXCoordinate = 35;

    if (!this.places) {
      this.stopLabelYCoordinate = this.mapped.height / 2;
    }

    if (this.stopType === 'stop') {
      this.helperCanvas.writeText(
        'Arrival: ' + this.utilityService.formatDateTime(aDate),
        dateXCoordinate, this.stopLabelYCoordinate - 16, dateFontSize, this.currentTheme.dateColor
      );
      this.helperCanvas.writeText(
        'Departure: ' + this.utilityService.formatDateTime(dDate),
        dateXCoordinate, this.stopLabelYCoordinate + 21, dateFontSize, this.currentTheme.dateColor
      );
      return;
    }

    const displayDate = this.stopType === 'source' ?
      this.utilityService.formatDateTime(aDate) :
      this.utilityService.formatDateTime(aDate);

    dateXCoordinate = this.stop.name.length > 12 ? 160 : 140;

    this.helperCanvas.drawFilledRect(
      dateXCoordinate - 5, this.stopLabelYCoordinate - 8,
      90, 15,
      this.currentTheme.sourceAndDestinationDateBackgroundColor
    );

    this.helperCanvas.drawOutlineRect(
      dateXCoordinate - 5, this.stopLabelYCoordinate - 8,
      90, 15,
      this.currentTheme.sourceAndDestinationDateBorderColor
    );

    this.helperCanvas.writeText(
      displayDate, dateXCoordinate,
      this.stopLabelYCoordinate + 2, dateFontSize, this.currentTheme.color
    );
  }

  renderStopSeparatorLines() {
    this.helperCanvas.drawLine(0, this.mapped.height,
      this.mapped.width, this.mapped.height,
      2, this.currentTheme.stopSeparatorColor);
  }

  renderPlaces() {
    let yCoordinate = this.stopLabelYCoordinate + this.placesHeightOffset;

    for (const place of this.places) {
      this.helperCanvas.drawOutlineRect(
        40, yCoordinate - 10, 180, 40, '#ccc'
      );

      const placeName = place.name.length > 20 ?
        place.name.substring(0, 20) + '...' :
        place.name;

      this.helperCanvas.writeText(
        placeName,
        80,
        yCoordinate + 12.5,
        7,
        this.currentTheme.color,
        'bold 10px ' + this.helperCanvas.fontFamily
      );

      this.renderPlacesMarker(place, yCoordinate);
      this.renderPlacesDates(place, yCoordinate);

      yCoordinate += this.placesHeightOffset;
    }
  }

  renderPlacesMarker(place: TimelinePlace, yCoordinate: number) {
    const image = document.createElement('img');

    if (place.type === 'attraction') {
      image.src = this.iconsBaseUrl +
        'anchor-' + this.currentTheme.placesMarkerColor + '.svg';
    } else if (place.type === 'hotel') {
      image.src = this.iconsBaseUrl +
        'bed-' + this.currentTheme.placesMarkerColor + '.svg';
    }

    image.onload = () => {
      this.helperCanvas.drawFilledCircle(
        20, yCoordinate + 8, 10, '#ccc'
      );
      this.helperCanvas.drawFilledCircle(
        20, yCoordinate + 8, 9, this.currentTheme.backgroundColor
      );
      image.style.backgroundColor = this.currentTheme.color;
      this.helperCanvas.drawBitmap(image, 20, yCoordinate + 8, 0);
    };
  }

  renderPlacesDates(place: TimelinePlace, yCoordinate: number) {
    const aDate = place.arrivalTime;
    const dDate = place.departureTime;
    const dateFontSize = 7;
    const dateXCoordinate = 80;

    this.helperCanvas.writeText(
      'Arrival: ' + this.utilityService.formatDateTime(aDate),
      dateXCoordinate, yCoordinate,
      dateFontSize, this.currentTheme.dateColor
    );

    this.helperCanvas.writeText(
      'Departure: ' + this.utilityService.formatDateTime(dDate),
      dateXCoordinate, yCoordinate + 25,
      dateFontSize, this.currentTheme.dateColor
    );
  }
}
