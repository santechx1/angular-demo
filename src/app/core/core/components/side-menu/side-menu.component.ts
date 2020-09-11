import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription, of } from "rxjs";
import {
  ResourceType,
  MenuResource,
  RoleType,
} from "../../../../shared/models";
import { State, getMenuState } from "../../reducers";
import { map, filter } from "rxjs/operators";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { Router, NavigationEnd } from "@angular/router";

export class MenuNode {
  children: MenuNode[];
  name: string;
  route: string;
  type: ResourceType;
}
export class MenuFlatNode {
  constructor(
    public hasChildren: boolean,
    public level: number,
    public name: string,
    public type: ResourceType,
    public route: string
  ) {}
}

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit, OnChanges, OnDestroy {
  public ResourceType = ResourceType;
  dataSource: MatTreeFlatDataSource<MenuNode, MenuFlatNode>;
  control: FlatTreeControl<MenuFlatNode>;
  flattener: MatTreeFlattener<MenuNode, MenuFlatNode>;
  selection = new SelectionModel<MenuFlatNode>(false);
  public expanded: boolean;
  public items$: Observable<MenuNode[]>;
  subscriptions: Subscription[] = [];
  @Input() public mobile = false;
  @Output() public onselect: EventEmitter<any> = new EventEmitter();
  hasChild = (_: number, node: MenuFlatNode) => node.hasChildren;
  isRoot = (idx: number, node: MenuFlatNode) =>
    !node.hasChildren && node.level === 0;

  constructor(private store: Store<State>, private router: Router) {
    this.items$ = store.select(getMenuState).pipe(
      filter((s) => !!s.menu),
      map((s) => {
        return s.menu
          .map((m) => {
            if (
              !(m.roles.length === 1)
            ) {
              const si = this.getSubItems(m);
              if (si === null) {
                return <MenuNode>{
                  children: [],
                  name: m.name,
                  route: this.getRoute(m),
                  type: m.type,
                };
              } else if (si.length === 0) {
                return null;
              } else if (si.length === 1) {
                return <MenuNode>{
                  children: [],
                  name: m.name,
                  route: si[0].route,
                  type: m.type,
                };
              } else {
                return <MenuNode>{
                  name: m.name,
                  route: null,
                  type: m.type,
                  children: si.map(
                    (i) =>
                      <MenuNode>{
                        name: i.display,
                        type: m.type,
                        route: i.route,
                        children: [],
                      }
                  ),
                };
              }
            }
          })
          .filter((m) => !!m);
      })
    );

    this.control = new FlatTreeControl<MenuFlatNode>(
      (node) => node.level,
      (node) => node.hasChildren
    );
    this.flattener = new MatTreeFlattener<MenuNode, MenuFlatNode>(
      (node, level) =>
        new MenuFlatNode(
          node.children && node.children.length > 0,
          level,
          node.name,
          node.type,
          node.route
        ),
      (flat) => flat.level,
      (flat) => flat.hasChildren,
      (node) => of(node.children)
    );
    this.dataSource = new MatTreeFlatDataSource(this.control, this.flattener);
  }
  ngOnInit() {
    this.expanded = this.mobile;
    this.subscriptions.push(
      this.items$.subscribe((nodes) => {
        this.dataSource.data = nodes;
      })
    );
    this.subscriptions.push(
      this.router.events.subscribe((val) => {
        if (
          val instanceof NavigationEnd &&
          val.urlAfterRedirects === "/c/dashboard"
        ) {
          this.selection.clear();
        }
        if (val instanceof NavigationEnd) {
          this.selection.clear();
          this.selected();
        }
      })
    );
  }
  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }
  onToggle() {
    if (!this.mobile) {
      this.expanded = !this.expanded;
    }
  }
  selected() {
    this.onselect.emit();
  }
  ngOnChanges() {
    this.expanded = this.mobile;
  }
  getRoute(item: MenuResource) {
    switch (item.type) {
      case ResourceType.Application:
        return `./application`;
      case ResourceType.Module1:
        return `./module2/${item.resourceRef}`;
      case ResourceType.Module2:
        return `./module1/${item.resourceRef}`;
      default:
        return "./";
    }
  }
  private buildModule1MenuModel(resource: MenuResource): MenuModel {
    return {
      items: {
        feature1: {
          display: "Feature 1",
          route: `./module1/${resource.resourceRef}/feature1`,
        },
        feature2: {
          display: "Feature 2",
          route: `./module1/${resource.resourceRef}/feature2`,
        },
      },
      roleMap: [
        {
          roles: [RoleType.Owner, RoleType.Reader],
          items: ["feature1", "feature2"],
        },
        {
          roles: [RoleType.Operator],
          items: ["feature2"],
        },
      ],
    };
  }

  private buildModule2MenuModel(resource: MenuResource): MenuModel {
    return {
      items: {
        feature1: {
          display: "Feature 1",
          route: `./module2/${resource.resourceRef}/feature1`,
        },
      },
      roleMap: [
        {
          roles: [RoleType.Owner, RoleType.Reader],
          items: ["feature1"],
        },
      ],
    };
  }
  private getSubItemsFromModel(
    model: MenuModel,
    roles: RoleType[]
  ): MenuItem[] {
    const items = roles
      .map((r) => {
        return model.roleMap
          .filter((rm) => rm.roles.includes(r))
          .map((rm) => rm.items)
          .reduce((x, y) => x.concat(y), []);
      })
      .filter((rm) => !!rm)
      .reduce((x, y) => x.concat(y), []);
    return Array.from(new Set(items)).map((i) => model.items[i]);
  }
  private getSubItems(resource: MenuResource): MenuItem[] {
    let mm: MenuModel;
    switch (resource.type) {
      case ResourceType.Module1:
        mm = this.buildModule1MenuModel(resource);
        return this.getSubItemsFromModel(mm, resource.roles);
      case ResourceType.Module2:
        mm = this.buildModule2MenuModel(resource);
        return this.getSubItemsFromModel(mm, resource.roles);
      default:
        return null;
    }
  }
}

interface MenuItem {
  display: string;
  route: string;
}
interface MenuModel {
  items: { [name: string]: MenuItem };
  roleMap: { roles: RoleType[]; items: string[] }[];
}
