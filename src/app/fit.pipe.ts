import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fit'
})
export class FitPipe implements PipeTransform {

  transform(title:string){

    return title.slice(0,10);
   
  }

}
