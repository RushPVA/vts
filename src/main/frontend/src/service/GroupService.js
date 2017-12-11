// @flow

export class GroupService {
  static instance: GroupService;
  constructor() {
    if(GroupService.instance){
      return GroupService.instance;
    }
    GroupService.instance = this;
  }

  defaultGroups: string[] = ['AXN', 'BRE', 'NEWTON', 'PAF', 'PYK', 'AUDAWATCH'];

  findDefault() : string[] {
    return this.defaultGroups;
  }
}
