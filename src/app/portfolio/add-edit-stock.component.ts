import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { StockService } from '@app/_services/stock.service';
import { first } from 'rxjs';
@Component({ templateUrl: '.\portfolio\add-edit-stock.component.html' })
export class AddEditStockComponent implements OnInit {

   form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private stockService: StockService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            Stockname: ['', Validators.required],
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
        });

        this.title = 'Add Stock';
        if (this.id) {
            // edit mode
            this.title = 'Edit Stock';
            this.loading = true;
            this.stockService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveStock()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Stock saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/stocks');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveStock() {
        // create or update Stock based on id param
        return this.id
            ? this.stockService.update(this.id!, this.form.value)
            : this.stockService.buyStock(this.form.value);
    }

}
