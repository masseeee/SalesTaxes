import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SALES TAXES';
  description = 'Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical\n' +
    'products that are exempt. Import duty is an additional sales tax\n' +
    'applicable on all imported goods at a rate of 5%, with no exemptions. When I purchase items\n' +
    'I receive a receipt which lists the name of all the items and their price (including tax),\n' +
    'finishing with the total cost of the items,\n' +
    'and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax\n' +
    'rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of\n' +
    'sales tax.';
}
