import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatsdt'
})
export class FormatsdtPipe implements PipeTransform {

  transform(value: string, args?: any): any {

    return value.substr(0,4)+'.'+value.substr(4,3)+ '.'+ value.substr(7,value.length-1);
  }


}
