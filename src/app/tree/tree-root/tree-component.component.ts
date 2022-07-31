import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Nodemodel } from 'src/shared/nodemodel';

import { TreeFolderService } from '../services/tree-folder.service';


@Component({
  selector: 'app-tree-component',
  templateUrl: './tree-component.component.html',
  styleUrls: ['./tree-component.component.css'],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ]
})

export class TreeRootComponent implements OnInit {

  // * create json model 
  treeData!: Nodemodel[];

  // * if isShowForm === true ?  show form : hide form
  isShowForm = false;

  // *  bydefault if of node id  is 0
  treeNodeId = 0;

  // * for store children data
  oldTreeNode: any;

  // * formgroup 
  treeDataForm!: FormGroup;

  ngOnInit(): void {
    this.initializationTreeForm();
    this.getTreeDataArrayObject();
    this.getTreeObjectOfChildNode();
  }

  // * Form Controls
  initializationTreeForm() {
    this.treeDataForm = new FormGroup({
      fileName: new FormControl('',[Validators.required]),
      fileType: new FormControl('',[Validators.required])
    })
  }

  constructor(
    private treeFolderService: TreeFolderService,
    private toasterSvc : ToastrService) {

  }

  // * add root node
  addRootNode() {
    // *  value of formcontrol name of treeDataForm
    const formValue = this.treeDataForm.value
    /*
        * if file name will  not available ,  then code will be  return from here
    */
    if (!(this.treeDataForm.value.fileName).trim()) {
      this.toasterSvc.warning("Please enter file or folder name")
      return;
    }

    /*
      create json for current node
    */
    const treeRootData = {
      name: formValue.fileName.trim(),
      type: formValue.fileType,
      id: this.treeNodeId++,
      children: []
    }

    /*
      * if this node will exist node , means this node will have a children , then add data
      * into the children node , else add data as a new node 
    */

    this.oldTreeNode ? this.oldTreeNode['children'].push(treeRootData) : this.treeData.push(treeRootData)
    this.treeFolderService.updateTreeStructureData(this.treeData);
    this.hideTreeForm();
    this.oldTreeNode = null;

  }

  // * hide form when isShowForm = false and form value will be reset;
  hideTreeForm() {
    this.isShowForm = false;
    this.treeDataForm.get('fileName')?.setValue('')
  }

  /* * click event for show form and set the value of 
     * root folder
  */
  addFolderOrFiles() {
    this.oldTreeNode = null;
    this.isShowForm = true;
    this.treeDataForm.controls['fileType'].setValue('folder');
  }

  /* 
    * get updated treeData array objects using subscribe method 
  */
  getTreeDataArrayObject() {
    this.treeFolderService.getTreeDataArrayObject().subscribe((res) => {
      this.treeData = res;
    });
  }

  /* 
    * if any node want to add data into it's children , then get the value of this node  using subscribe method ,
    * so i can know that node is exist node
  */
  getTreeObjectOfChildNode() {
    this.treeFolderService.getTreeObjectOfChildNode().subscribe((res) => { 
      if (res) {
        this.addChildNode(res);
      }
    });
  }

  /*  
      add children data into the exist node , and bydefault set value of filetype is folder
  */
  addChildNode(childrenData: any) {
    this.isShowForm = true;
    this.oldTreeNode = childrenData;
    this.treeDataForm.controls['fileType'].setValue('folder');
  }
}



