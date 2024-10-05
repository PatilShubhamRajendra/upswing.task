import { Component, ViewChild } from '@angular/core';
import { Product } from 'src/app/table_data';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/apiservice';
import { Sidebar } from 'primeng/sidebar';
import { Table } from 'primeng/table';
import { ImportsModule } from './import';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  formname: string = '';
  drawerVisible: boolean = false;
  submitted: boolean = false;
  addoredit: any;
  searchText: any = '';
  data: Product = new Product();
  products!: Product[];
  chartData: any[] = [];

  // Chart options
  view: [number, number] = [400, 590];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Products';
  showYAxisLabel = true;
  yAxisLabel = 'Quantity';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getProducts();
  }

  // Get product data for service
  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.extractCategories();
      this.updateChartData();
    })
  }

  categories: any[] = [];
  selectedCategory: string = 'All';

  // Extract categories for category dropdown in chart
  extractCategories() {
    const categoryArray = new Set(this.products.map(product => product.category));
    this.categories = Array.from(categoryArray);
    this.categories.unshift('All');
  }

  // Update data chart as per table data changes
  updateChartData() {
    const filteredProducts = this.selectedCategory === 'All'
      ? this.products
      : this.products.filter(product => product.category === this.selectedCategory);

    this.chartData = filteredProducts.map(product => ({
      name: product.name,
      value: product.quantity,
    }));
  }


  // Change selected category wise data
  onChange(event: any) {
    this.selectedCategory = event.target.value;
    this.updateChartData();
  }

  // Open darwer to add data
  add() {
    this.data = {};
    this.formname = 'Add Product';
    this.drawerVisible = true;
    this.addoredit = 'A'
  }

// Open edit darwer with data 
  edit(data: any) {
    this.addoredit = 'E'
    this.data = Object.assign({}, data);
    this.formname = 'Update Product';
    this.drawerVisible = true;
  }

  // Delete product 
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.data = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.updateChartData();
      }
    });
  }

  // Add and Update data
  saveProduct() {
    this.submitted = true;

    if (this.data.name == '' || this.data.name == undefined) {
      this.messageService.add({ severity: 'error', detail: 'Please enter name', life: 3000 });
      this.submitted = false;
    }
    else if (this.data.price == null || this.data.price == undefined) {
      this.messageService.add({ severity: 'error', detail: 'Please enter price', life: 3000 });
      this.submitted = false;
    }
    else if (this.data.category == null || this.data.category == undefined) {
      this.messageService.add({ severity: 'error', detail: 'Please select category', life: 3000 });
      this.submitted = false;
    }

    if (this.submitted) {
      if (this.data.name?.trim()) {
        if (this.data.id) {
          this.products[this.findIndexById(this.data.id)] = this.data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.drawerVisible = false;
        } else {
          this.data.id = this.createId();
          this.products.unshift(this.data);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          this.drawerVisible = false;
        }
        this.products = [...this.products];
        this.updateChartData();
      }
    }
  }

  // Find prodcut using index 
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  // Create new id for new product
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // Close drawer (Cancel Button)
  cancel() {
    this.drawerVisible = false;
    this.data = new Product();
  }

  // Close drawer(Cancel Icon)
  @ViewChild('drawerRef') drawerRef!: Sidebar;

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
    this.data = new Product();
  }

  onSelect(event: any): void {
    console.log(event);
  }

  // Accept only number
  onlynumber(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  // Search data in table
  @ViewChild('dt') dt!: Table;
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    this.dt.filterGlobal(searchTerm, 'contains');
  }

}
