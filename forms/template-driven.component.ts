import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HelperService } from '../../services/helper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  regData: any = {
    name: '',
    phone: '',
    email: '',
    pass: '',
    cpass: '',
    userType: 'EP'
  };
  loading: boolean = false;
  spaceErr: boolean;
  spaceErrp: boolean;
  userDetails: any;

  /**
   * @constructor{{DI will be pushed here}}
   */
  constructor(
    private authServ: AuthenticationService,
    private helperServ: HelperService,
    private router: Router,
  ) { }

  /**
   * @function{{ngOnInit}}
   * @description{{Lifecycle hook}}
   */
  ngOnInit() {
  }

  /**
   * @function{{register}}
   * @description{{register for email password}}
   */
  register() {
    this.loading = true;
    this.authServ.signUp(this.regData).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        this.helperServ.showToast('Logged in successfully');
      }
    );
  }

  /**
   * @function{{errDtc}}
   * @description{{error detection for white space}}
   */
  errDtc(data) {
    if(data.trim().length>0) {
      this.spaceErr = false;
      return false;
    }
    else {
      if(data.length>0) {
        this.spaceErr = true;
        return true;
      }
    }
  }

}
