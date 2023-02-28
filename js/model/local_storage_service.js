/* Class LocalStorageService- a class for persistant CRUD in LocalStorage. */
export default class LocalStorageService {
    "use strict"
    constructor(data, key) {
       this.origModel = data;
       this.key = key;
       console.log("LocalStorageService constructor");
       //if data is NOT in local storage, init and sort using sortCol and sortDir from the model
       if(!this.retrieve()){   
          this.model = this.cloneObject(data);   //get copy of data
          this.sort(this.sortCol, this.sortDir, true);   //apply default sort
         
       }
    }
    //Getters
    get sortCol(){
       return this.model.app.sortCol;
    }
    set sortCol(col){
       this.model.app.sortCol=col;
    }
    get sortDir(){
       return this.model.app.sortDir;
    }
    set sortDir(dir){
       this.model.app.sortDir=dir;
    }
    get size() {
       return this.model.data.length;
    }
    get list() {
      return this.model.data;
    }
    
    //CRUD FUNCTIONS
    create(obj) {
      //TODO
      //append new object to data store
      // persist in local storage by calling store()
      this.model.data.push(obj);
      this.store();

    }
    read(getId) {
       //TODO: returns the item in the array with id=getId, null if it is not found
       //- DONE -//
       const idx = this.getItemIndex(getId);
      //  console.log(idx, getId)
       if (idx != -1) {
         // console.log(this.model.data);
         return this.model.data[idx];
       }
       return null;
    }

    update(obj) {
       //TODO
      //find index of object in array
      //update object with new contents
      // persist in local storage by calling store()
      const idx = this.getItemIndex(obj.id);
      // console.log(idx);
      if (idx != -1) {
         this.model.data[idx] = obj;
         // this.model.data.splice(idx, 1, obj)
         // console.log(this.model.data);
         this.store();
      }
      
    }
 
    delete(removeId) {
         //TODO
         //find index of object in array
        //remove object with specified id from model.data (splice?)
        // persist in local storage by calling store()
        const idx = this.getItemIndex(removeId);
        if (idx != -1) {
            this.model.data.splice(idx,1);
            this.store();
        }
    }
 
    //LocalStorage Functions
    reset() {
      //TODO:
      //should clear local storage 
      //should restore model from origModel 
      //(use utility function 'cloneObject' at bottom of file)
      // -- DONE -- //
      localStorage.clear();
      this.model = this.cloneObject(this.origModel);
      this.store();
    }
    clear() {
       //TODO: should clear local storage
       // -- DONE -- //
       localStorage.clear();
      //  this.model = this.origModel;
    }
    store() {
       //TODO: should store your model in localStorage
       // -- DONE -- //
       localStorage.setItem(this.key, JSON.stringify(this.model));

    }
    retrieve() {
        //TODO
        //should retrieve your model from localStorage using this.key
        //If data retrieved from LocalStorage, updates this.model
        //hint:  remember to 'parse' the LocalStorage string value back into an object!
        //return true if model retrieved from localStorage, false if key wasn't found in localStorage 
        
        // -- DONE -- //
        if (localStorage.getItem(this.key)) {
            this.model = JSON.parse(localStorage.getItem(this.key));
            return true;
        }
        return false;  //returning false for now
    }
 
    //Sorting and Filtering Functions
    sort(col, direction, perm = false) {
        //TODO
        // -- done -- //
        //returns a copy of the model.data (util func 'cloneArray'), sorted using the 'col' and 'direction' specifications (see index.html for example)
        // storageSvc.sort('name','asc')
        // if 'perm' param is set to true, you should update the internal model.data 
        //with the sorted list, and call 'store' to store in local storage
        //also, store the sort col and direction in the 'app' portion of the model

        const compAsc = (a,b) => {
         if (a[col] < b[col]) {
            return -1;
         }
         if (a[col] > b[col]) {
            return 1;
         }
         return 0;
      };

      const compDesc = (a,b) => {
         if (a[col] < b[col]) {
            return 1;
         }
         if (a[col] > b[col]) {
            return -1;
         }
         return 0;
      };
      
      let data = this.cloneObject(this.model.data);
      
      data = direction === 'asc' ? data.sort((a,b) => compAsc(a,b)) : data.sort((a,b) => compDesc(a,b))

      this.model.app.sortCol = col;
      this.model.app.sortDir = direction;

      if (perm === true) {
         this.model.data = data;
         this.store();
      }
      
      return data;
    }
    
    filter(filterObj) {
        //returns a copy of the filtered array
        //filterObj contains an object with all the key/value pairs you 
        //will filter model.data with.
        //See MDN array 'filter' function documentation
        //Example call: storageSvc.filter({coachLicenseLevel:1,coachLast:"Jenson"});
        const keys = Object.keys(filterObj);
        let data = this.cloneObject(this.model.data);
        data = data.filter((el) => el[keys[0]] == filterObj[keys[0]]);
        return data;
    }
 
    //Utility functions-IMPLEMENT THESE FIRST
    getItemIndex(id){
      // - DONE - //
      //return index of team with given id
      //see MDN array 'find' documentation  
      //created separate function for this since multiple methods need to get the index of an item
      let item = this.model.data.find((el) => el.id === id);
      return this.model.data.indexOf(item)
    }

    cloneObject(obj){
       //util function for returning a copy of an object
       return JSON.parse(JSON.stringify(obj));
    }
    
 }