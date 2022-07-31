import { Component, Input, OnInit } from '@angular/core';
import { TreeFolderService } from '../services/tree-folder.service';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {
  
  // * get treeData from parents component
  @Input('treeData') treeData: any

  constructor(private treeFolderService: TreeFolderService) { }

  ngOnInit(): void { 
  }

  /* add children node */
  addchildrenNode(node: any) {
    this.treeFolderService.updatedChildrenNodeData(node);
  }

  /* 
      * if children will be undefined , then parent node will be deleted ,
      *  otherwise children node will be delete as well as number of children node length 
      *  also will delete
  */
  deleteTreeNodes(index : number){
    return this.treeData.children === undefined ? this.treeData.splice(index, 1)  : 
             this.treeData.children.splice(index , this.treeData.children.length)

  }
  
}

