import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const expectedRole = next.data['role']; // 'patient'
    const userRole = this.authService.getUserRole();
    
    console.log('🛡️ RoleGuard Verification:');
    console.log('🛡️ Expected Role:', expectedRole);
    console.log('🛡️ User Role:', userRole);
    console.log('🛡️ Comparison:', userRole === expectedRole);
    
    if (userRole?.toLowerCase() === expectedRole?.toLowerCase()) {
      return true;
    }

    console.warn('🚫 Access denied. Required role:', expectedRole);
    this.router.navigate(['/access-denied']); // o ['/']
    return false;
  }
}