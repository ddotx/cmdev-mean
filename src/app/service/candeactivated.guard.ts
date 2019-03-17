import { CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from "@angular/common";
import { Injectable } from '@angular/core';

@Injectable()
export class DeActivatedGuard implements CanDeactivate<any> {

    constructor(private readonly location: Location, private readonly router: Router
    ) { }

    canDeactivate(
        target: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): boolean {

        if (!target.mIsSubmitted) {

            // Fix wrong route history error
            const currentUrlTree = this.router.createUrlTree([], currentRoute);
            const currentUrl = currentUrlTree.toString();
            this.location.go(currentUrl);
            return window.confirm("Are you sure?")
        }
        return true;
    }
}