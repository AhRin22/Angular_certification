import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from '../location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})

export class LocationComponent implements OnInit {
  @ViewChild('addLocationForm')  addLocationForm!: NgForm;
  @ViewChild('error') error!: ElementRef;
  locations:Array<string>=[];
 

  constructor(private locationServer:LocationService, private modalService: NgbModal) {
    let locationInLocalStorge = localStorage.getItem("locations");
    if(locationInLocalStorge!==null)
      this.locations=JSON.parse(locationInLocalStorge);
  }

  ngOnInit() {  
   this.locations=this.locationServer.locations;
  }

  onSubmit() {
    let zipcode=this.addLocationForm.value.zipcode;
        this.locationServer.getLocationInfo(zipcode).subscribe({
            next: (data) =>{
              this.locationServer.addLocation(zipcode);
              this.addLocationForm.reset();
              },
             error: (error) => {
              console.log(error.message);
              this.modalService.open(this.error)
            },
          })
  }

  clearInput(){
    this.addLocationForm.reset();
  }
}
