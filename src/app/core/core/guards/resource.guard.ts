import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { map, filter } from "rxjs/operators";
import { ResourceType, RoleType } from "../../../shared/models";
import * as core from "../reducers";
import { MenuLoad } from "../actions/menu.action";

@Injectable({
  providedIn: "root",
})
export class ResourceGuard implements CanActivateChild {
  static resourceTypeMap = {
    module1: ResourceType.Module1,
    module2: ResourceType.Module2,
  };
  core$: Observable<core.CoreState>;

  constructor(private store: Store<core.CoreState>, private router: Router) {
    this.core$ = store.pipe(select(core.getCoreState));
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = next.params["id"];
    const resourceType = state.url.split("/")[2];
    if (!id) {
      return true;
    }
    return this.core$.pipe(
      map((s) => {
        if (s.menu.error !== null) {
          return false;
        }
        if (!s.menu || !s.menu.menu) {
          if (!s.menu.loading) {
            this.store.dispatch(new MenuLoad());
          }
          return null;
        }
        const menuItem = s.menu.menu.find((i) => {
          if (i.roles.length === 1) {
            return false;
          }
          return (
            i.entityRef === id &&
            i.type === ResourceGuard.resourceTypeMap[resourceType]
          );
        });
        return !!menuItem;
      }),
      filter((r) => r !== null)
    );
  }
}
