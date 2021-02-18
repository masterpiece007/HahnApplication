export class ObjectValueValueConverter {
  //toView(obj) {
  //  return Reflect.ownKeys(obj);
  //}

  toView(obj: any[]) {
    let temp = [obj.length]; 
    for (let val of obj) {
      temp.push(val);
    }
    return temp;
  }

  fromView(value) {
    //
  }
}
