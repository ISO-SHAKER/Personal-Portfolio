import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillsComponent } from './components/skills/skills.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceFormComponent } from './components/services/service-form/service-form.component';
import { ServicesTableComponent } from './components/services/services-table/services-table.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioFormComponent } from './components/portfolio/portfolio-form/portfolio-form.component';
import { PortfoliosTableComponent } from './components/portfolio/portfolios-table/portfolios-table.component';
import { EducationComponent } from './components/education/education.component';
import { EducationFormComponent } from './components/education/education-form/education-form.component';
import { EducationTableComponent } from './components/education/education-table/education-table.component';
import { WorkComponent } from './components/work/work.component';
import { WorkFormComponent } from './components/work/work-form/work-form.component';
import { WorkTableComponent } from './components/work/work-table/work-table.component';
import { HomeComponent } from './components/home/home.component';
import { HomeFormComponent } from './components/home/home-form/home-form.component';
import { HomeTableComponent } from './components/home/home-table/home-table.component';
import { AboutComponent } from './components/about/about.component';
import { AboutFormComponent } from './components/about/about-form/about-form.component';
import { AboutTableComponent } from './components/about/about-table/about-table.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactTableComponent } from './components/contact/contact-table/contact-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HandleErrorInterceptor } from './interceptors/handle-error-interceptor';
import { SkillFormComponent } from './components/skills/skill-form/skill-form.component';
import { ItemFormComponent } from './components/skills/item-form/item-form.component';
import { SkillsHeaderComponent } from './components/skills/skills-header/skills-header.component';
import { SkillsTableComponent } from './components/skills/skills-table/skills-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TopbarComponent,
    SkillsComponent,
    ServicesComponent,
    ServiceFormComponent,
    ServicesTableComponent,
    PortfolioComponent,
    PortfolioFormComponent,
    PortfoliosTableComponent,
    EducationComponent,
    EducationFormComponent,
    EducationTableComponent,
    WorkComponent,
    WorkFormComponent,
    WorkTableComponent,
    HomeComponent,
    HomeFormComponent,
    HomeTableComponent,
    AboutComponent,
    AboutFormComponent,
    AboutTableComponent,
    ContactFormComponent,
    ContactTableComponent,
    ContactComponent,
    DashboardComponent,
    SkillFormComponent,
    ItemFormComponent,
    SkillsHeaderComponent,
    SkillsTableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
