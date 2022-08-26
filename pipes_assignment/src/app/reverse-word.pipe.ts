import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverseWord",
})
export class ReverseWordPipe implements PipeTransform {
  transform(value: any): any {
    return value.split("").reverse().join("");
  }
}
