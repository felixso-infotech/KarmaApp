import { ActivityModel } from './../api/models/activity-model';

import { ActivityService } from './../activity.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AggregateQueryResourceService } from '../api/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  colors = [
    "#f1a11f",
    "#c44538",
    "#1fa48a",
    "#425569",
    "#20a48a",
    "#3185bd",
    "#d66012"
  ];
  //10, 9, 6 ,2
/*   prizes = [
    "Hand of god",
    "The old days",
    "The unforgettable help",
    "My pet"
  ]; */
  activities:ActivityModel[];
  wheelActivities:string[]=[];
  activitySelected : ActivityModel;

  constructor(private router: Router, private activityService: ActivityService,private alertController:AlertController,private service:AggregateQueryResourceService) { }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnInit() {
    console.log('ngOninit');
    this.service.findIncompletedActivityByRegisteredUserIdByQueryUsingGET({'registeredUserId': 1}).subscribe(response=>{
      this.activities=response;
      this.activities.forEach(element => {
        this.wheelActivities.push(element.title);
      });
      this.activitySelected=this.activities[0];
      //console.log(this.activitySelected);
    });
  }

  async presentAlert() {
    console.log("activity got",this.activitySelected.title);
    console.log("activity id",this.activitySelected.id);
    const alert = await this.alertController.create({
      header: 'Congradulations..!',
      subHeader: 'Activity got:'+this.activitySelected.title,
      message: 'This is an alert message.',
      buttons: [{
        text: 'Spin again',
        role: 'cancel'
      },
      {
        text: 'Proceed',
        role: 'okay',
        handler: ()=>{
          this.router.navigate(['tabs/home/gratitude-challenge/'+this.activitySelected.id]);
        }
      }
      ]
    });

    await alert.present();
  }

  loadActivities() {
    setTimeout(() => {
      if (this.activityService.currentUser.name != '') {
        this.router.navigate(['tabs/home/activities']);
      } else {
        this.router.navigate(['login']);
      }
    }, 5000);
    this.router.navigate(['activities']);
  }


  beforeSpin() {
   /*  (<any>window).AccountKitPlugin.loginWithPhoneNumber({	useAccessToken: true,
      defaultCountryCode: "IN",
      facebookNotificationsEnabled: true},
      data=>{
        console.log("verification success");
        console.log(data);
        (<any>window).AccountKitPlugin.getAccount(
          info=>{
            console.log(info.phoneNumber);
            this.registerService.phoneNumber=info.phoneNumber;
            this.router.navigate(['/register']);
          },
          err=>{console.log(err);})
        }
      ); */
      this.activitySelected = this.activities[Math.floor(Math.random() * this.activities.length)];
  }

  afterSpin() {
    this.presentAlert();
  }
}

