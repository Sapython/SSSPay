import { Component, Input,OnInit } from '@angular/core';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  // @Input() amount:string = '48,900'
  // @Input() currency:string = '₹'
  // @Input() sign:string = '+'
  // @Input() time:string = '11.20 PM'
  // @Input() date:string = '22 may 2022'
  // @Input() name:string = 'Ranvijay Sinha'
  // @Input() status:string = "success"
  public transactions=[
   
    {
      id:1,
      name:'Ranvijay Sinha',
      amount:"48,900",
      sign:'+',
      status:"success",
      time:'11.20 PM',
      date:'22 may 2022',
       image:"https://i.pravatar.cc/300"

    }, {
      id:2,
      name:'Madhab Sinha',
      amount:"8,900",
      sign:'-',
      status:"danger",
      time:'01.20 AM',
      date:'22 May 2022',
       image:"https://i.pravatar.cc/300"
    

    },
    {
      id:3,
      name:'Tony Stark',
      amount:"4,900",
      sign:'+',
      status:"success",
      time:'07.20 PM',
      date:'25 may 2022',
       image:"https://i.pravatar.cc/300"
    

    },
    {
      id:4,
      name:'Kamala Khan',
      amount:"900",
      sign:'-',
      status:"danger",
      time:'11.20 PM',
      date:'22 may 2022',
       image:"https://i.pravatar.cc/300"
    

    },
    {
      id:5,
      name:'America Savage',
      amount:"8,900",
      sign:'+',
      status:"success",
      time:'11.20 PM',
      date:'21 may 2022',
       image:"https://i.pravatar.cc/300"
    

    },
    {
      id:6,
      name:'Narendra Modi',
      amount:"4,900",
      sign:'-',
      status:"danger",
      time:'11.20 PM',
      date:'5 April 2022',
       image:"https://i.pravatar.cc/300"
    

    },
    {
      id:7,
      name:'Pritam Kumar',
      amount:"48,900",
      sign:'-',
      status:"danger",
      time:'11.20 PM',
      date:'27 Jan 2022',
       image:"https://i.pravatar.cc/300"
    

    },
  
  ]
  constructor(    ) { }

  ngOnInit() {
  }

}
