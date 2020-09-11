import { ResourceType, RoleType } from '.';

export class MenuResource {
    resourceRef: string;
    name: string;
    type: ResourceType;
    roles: RoleType[];
}
