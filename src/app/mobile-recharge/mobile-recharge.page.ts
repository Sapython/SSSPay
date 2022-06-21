import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.page.html',
  styleUrls: ['./mobile-recharge.page.scss'],
})
export class MobileRechargePage implements OnInit {
  searchVall: string;
  operators: {
    id: string;
    name: string;
  }[];
  contacts = [
    {
      id: 1,
      name: 'Kumar Saptam',
      image: 'https://i.pravatar.cc/300',
      number: 256365214,
      operator: 'airtel',
    },
    {
      id: 2,
      name: 'Dinesh Kartik',
      image: 'https://i.pravatar.cc/300',
      number: 992288228,
      operator: 'jio',
    },
    {
      id: 3,
      name: 'Avisek samal',
      image: 'https://i.pravatar.cc/300',
      number: 545453434,
      operator: 'vi',
    },
    {
      id: 4,
      name: 'Mark Spector steven',
      image: 'https://i.pravatar.cc/300',
      number: 434366224,
      operator: 'bsnl',
    },
    {
      id: 5,
      name: 'Arther Harrow',
      image: 'https://i.pravatar.cc/300',
      number: 256365214,
      operator: 'airtel',
    },
    {
      id: 6,
      name: 'Dinesh',
      image: 'https://i.pravatar.cc/300',
      number: 4345566566,
      operator: 'vi',
    },
    {
      id: 7,
      name: 'Sweta Tripathi',
      image: 'https://i.pravatar.cc/300',
      number: 256365214,
      operator: 'airtel',
    },
    {
      id: 8,
      name: 'Arvind Kejriwal',
      image: 'https://i.pravatar.cc/300',
      number: 2233121111,
      operator: 'airtel',
    },
  ];

  constructor(
    private databaseService: DatabaseService,) {}

  ngOnInit() {
    this.databaseService.getOperators().then((docs) => {
      this.operators = [];
      docs.forEach((doc) => {
        this.operators.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    });
  }
}
