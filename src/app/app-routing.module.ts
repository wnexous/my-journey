import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { UserResumeComponent } from './pages/user-resume/user-resume.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeIsLoggedComponent } from './pages/home-is-logged/home-is-logged.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent},
  { path: "create-project", component: CreateProjectComponent },
  { path: "user-resume", component: UserResumeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "home", component: HomeIsLoggedComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "about-us", component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
