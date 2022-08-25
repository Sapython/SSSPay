import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { PageSetting } from '../structures/method.structure';
import { UserData } from '../structures/user.structure';

@Injectable()
export class DataProvider{
    public data:any;
    public pageSetting:PageSetting={
        blur:false,
        lastRedirect:'',
        message:'',
        spinner:false,
        messageType:'Error'
    };
    public sits:any;
    public wallet:any;
    public userData:UserData | undefined;
    public gotUserData:boolean = false;
    public loggedIn:boolean = false;
    public gettingUserData = new Subject();;
    public userID:string | undefined;
    public userInstance:User;
    public verifyEmail:boolean | undefined;
    public reloadPage:boolean = false;
    public checkoutData:any;
    public shippingData:any;
    public dataOne:any;
    public dataTwo:any;
    public logs:any[];
    public dataThree:any;
    public dataFour:any;
    constructor(){}
}