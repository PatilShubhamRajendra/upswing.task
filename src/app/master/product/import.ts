import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/service/apiservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        FormsModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        ButtonModule,
        FileUploadModule,
        RatingModule,
        TagModule,
        InputTextModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        DialogModule,
        SidebarModule,
        DropdownModule,
        RippleModule,
        RadioButtonModule,
        NgxChartsModule,
    ],
    exports: [
        FormsModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        ButtonModule,
        FileUploadModule,
        RatingModule,
        TagModule,
        InputTextModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        DialogModule,
        SidebarModule,
        DropdownModule,
        RippleModule,
        RadioButtonModule,
        NgxChartsModule,
    ],
    providers: [ProductService, MessageService, ConfirmationService],
})

export class ImportsModule { }

