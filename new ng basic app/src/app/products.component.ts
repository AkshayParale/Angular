import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'

})
export class ProductsComponent implements OnInit, OnDestroy {
    productName = 'A Book';
    isDisabled = true;
    products = [];
    private productsSubscription: Subscription;

    constructor(private productsService: ProductsService) {
        setTimeout(() => {
            // this.productName = 'A Tree';
            this.isDisabled = false;
        }, 3000);
    }
    ngOnInit(): void {
        this.products = this.productsService.getProducts();
        this.productsSubscription = this.productsService.productUpdated.subscribe(() => {
            this.products = this.productsService.getProducts();
        })
    }

    onAddProduct(form) {
        //this.products.push(this.productName);
        console.log(form);
        if (form.valid) {
           // this.products.push(form.value.productName);
            this.productsService.addProducts(form.value.productName)
        }
    }

    onRemoveProduct(productName: string) {
        this.products = this.products.filter(p => p !== productName)
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }
}