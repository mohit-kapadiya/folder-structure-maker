import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Nodemodel } from 'src/shared/nodemodel';



@Injectable({
  providedIn: 'root'
})
export class TreeFolderService {
  // *create a array using Nodemodel interface
  treeFolderData: Nodemodel[] = []
  /*
    * store parents node of treeDirectorey using behaviour subject and bydefault parameter is treeFolderData array
  */
  treeData: BehaviorSubject<Nodemodel[]> = new BehaviorSubject<Nodemodel[]>(this.treeFolderData);
  /*
    store children node  of treeDirectorey using behaviour subject and bydefault parameter is null
  */
  addTreeChildData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  /*
      *  update tree structure data and emit next value
  */
  updateTreeStructureData(res: any) {
    this.treeData.next(res);
  }

  /*
    return updated tree data array objects
  */
  getTreeDataArrayObject() {
    return this.treeData.asObservable();
  }

  /*
   return exist node with it's children data objects
 */
  getTreeObjectOfChildNode() {
    return this.addTreeChildData.asObservable();
  }

   /*
      *  if any node want to store the value in it's children then update 
      *  the value of that node and emit next value
  */
  updatedChildrenNodeData(res: any) {
    this.addTreeChildData.next(res);
  }

}
