import { Component } from '@angular/core';
import {Item} from "../item";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  items: Item[] = [];
  // All total values
  total_amount = 0;
  total_sales_taxes = 0;
  total_additional_sales_taxes = 0;
  // Enter here all goods that are tax-free.
  taxfree = ['chocolate', 'chocolates', 'book', 'pills']

  /**
   * Adds an item with all his members to the item array
   * @param {string} value - Input data
   */
  addItem(value: string) {

    // Split the string into pieces always when a space is detected and saves it in an array.
    let splitted_string_ary = value.split(" ");

    // Basic taxes rate (for product 10% and for not imported product 0%)
    let rate_salesTaxes = 0.1;
    let rate_additional_salesTaxes = 0;

    // Detect if the item is a tax-free item like food, books and medical stuff and set it to 0%.
    for (let i = 0; i < this.taxfree.length; i++) {
      if ( splitted_string_ary.includes(this.taxfree[i]) ) {
        rate_salesTaxes = 0;
      }
    }

    // Detect all imported products and put the additional to 5%
    for (let i = 1; i < splitted_string_ary.length; i++) {
      if (splitted_string_ary[i] == 'imported') {
        rate_additional_salesTaxes = 0.05;
      }
    }

    // Calculate taxes for an item.
    // new_salesTaxes = rate sales taxes * price * quantity, then round it.
    let new_salesTaxes = rate_salesTaxes * Number(splitted_string_ary[splitted_string_ary.length-1]) *  Number(splitted_string_ary[0]);
    new_salesTaxes = Math.round(new_salesTaxes * 100) / 100;

    // new_additional_salesTaxes = rate additional sales taxes * price * quantity, then round it.
    let new_additional_salesTaxes = rate_additional_salesTaxes * Number(splitted_string_ary[splitted_string_ary.length-1]) *  Number(splitted_string_ary[0]);
    new_additional_salesTaxes = Math.round(new_additional_salesTaxes * 100) / 100;

    // Update the price of the item with the total price with taxes: (Quantity * Price) + (Quantity * (taxes + addit taxes))
    let new_price = ( Number(splitted_string_ary[0]) * Number(splitted_string_ary[splitted_string_ary.length-1]) ) + ( Number(splitted_string_ary[0]) * (new_salesTaxes + new_additional_salesTaxes) );
    new_price = Math.round(new_price * 100) / 100;

    // Overrides the price with the new total price.
    splitted_string_ary[splitted_string_ary.length-1] = new_price.toString();

    // Change the string name of an item (output).
    let new_name = splitted_string_ary.join(" ");
    new_name = new_name.replace(' at', ':');

    // Create the item with all his new members.
    const newItem: Item ={
      name: new_name,
      quantity: Number(splitted_string_ary[0]),
      price: new_price,
      salesTaxes: new_salesTaxes,
      additional_salesTaxes: new_additional_salesTaxes
    }

    // Push/Save the new item into the item array.
    this.items.push(newItem)
    console.log(this.items);
  }

  /**
   * Ends the purchase of all items and calculate total amount and total sales taxes.
   */
  endShopping() {

    for (let i = 0; i < this.items.length; i++) {
      this.total_amount += this.items[i].price;
      this.total_sales_taxes += this.items[i].salesTaxes;
      this.total_additional_sales_taxes += this.items[i].additional_salesTaxes;
    }
    this.total_sales_taxes += this.total_additional_sales_taxes;
    this.total_sales_taxes= Math.round(this.total_sales_taxes * 100) / 100;
    this.total_amount = Math.round(this.total_amount * 100) / 100;

  }

  /**
   * Resets all values and the item array into an empty array.
   */
  resetItem() {
    this.items = [];
    this.total_amount = 0;
    this.total_sales_taxes = 0;
    this.total_additional_sales_taxes = 0;
  }
}
