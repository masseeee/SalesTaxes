import { Component, OnInit } from '@angular/core';
import {Item} from "../item";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  items: Item[] = [];
  total_amount = 0;
  total_sales_taxes = 0;
  total_additional_sales_taxes = 0;
  //Enter all goods that are tax-free.
  taxfree = [ 'chocolate', 'chocolates:', 'book:', 'pills:']

  ngOnInit(): void {
  }

  addItem(value: string) {

    const newString = value.replace(' at', ':');
    const splitted = newString.split(" ");
    let rate_salesTaxes = 0.1;
    let rate_additional_salesTaxes = 0;

    for (let i = 1; i < splitted.length; i++) {
      if (splitted[i] == 'imported') {
        rate_additional_salesTaxes = 0.05;
      }
    }

    for (let i = 0; i < this.taxfree.length; i++) {
      if ( splitted.includes(this.taxfree[i]) ) {
        rate_salesTaxes = 0;
      }
    }

    const newItem: Item ={
      name: newString,
      quantity: Number(splitted[0]),
      price: Number(splitted[splitted.length-1]) *  Number(splitted[0]),
      salesTaxes: rate_salesTaxes * Number(splitted[splitted.length-1]) *  Number(splitted[0]),
      additional_salesTaxes: rate_additional_salesTaxes * Number(splitted[splitted.length-1]) *  Number(splitted[0]),
    }

    this.items.push(newItem)
    console.log(this.items);
  }

  endShopping() {

    for (let i = 0; i < this.items.length; i++) {
      this.total_amount += this.items[i].price;
      this.total_sales_taxes += this.items[i].salesTaxes;
      this.total_additional_sales_taxes += this.items[i].additional_salesTaxes;
    }
    this.total_sales_taxes += this.total_additional_sales_taxes;
    this.total_amount += this.total_sales_taxes;
  }

  resetItem() {

    this.items = [];
    this.total_amount = 0;
    this.total_sales_taxes = 0;
  }
}
