import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { UserResumeComponent } from './pages/user-resume/user-resume.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent},
  { path: "create-project", component: CreateProjectComponent},
  { path: "user-resume", component: UserResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
