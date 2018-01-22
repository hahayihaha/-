import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AuthGuard} from './auth-guard.service';
import { IndexComponent } from './user/index/index.component';
import { WidgetsModule} from './widgets/widgets.module';
import { AddComponent } from './user/add/add.component';
import {FileUploadModule} from 'ng2-file-upload';
import { XutouComponent } from './user/xutou/xutou.component';
import { AdminComponent } from './admin/admin.component';
import { HttpModule } from "@angular/http";
import { AddadminComponent } from './addadmin/addadmin.component';
import { ModifyComponent } from './modify/modify.component';
import { ColumnComponent } from './column/column.component';
import { DetailsxutouComponent } from './column/detailsxutou/detailsxutou.component';
import { EditComponent } from './user/edit/edit.component';
import { DetailsComponent } from './user/details/details.component';
import { XutoulistComponent } from './user/xutoulist/xutoulist.component';

const root: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'admin', component: AdminComponent},
      {path: 'addadmin', component: AddadminComponent},
      {path: 'modify/:id', component: ModifyComponent},
      {path: 'users', component: IndexComponent},
      {path: 'users/add', component: AddComponent},
      {path: 'users/xutoulist', component: XutoulistComponent},
      {path: 'users/edit/:id', component: EditComponent},
      {path: 'users/xutou/:id', component: XutouComponent},
      {path: 'details/:id', component: DetailsComponent},
      {path: 'column/:id', component: ColumnComponent},
      {path: 'deta/:id', component: DetailsxutouComponent},
      {path: '**', component: IndexComponent}
    ]
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    AddComponent,
    XutouComponent,
    AdminComponent,
    AddadminComponent,
    ModifyComponent,
    ColumnComponent,
    DetailsxutouComponent,
    EditComponent,
    DetailsComponent,
    XutoulistComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    WidgetsModule,
    FileUploadModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(root)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
