import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.scss']
})
export class IbanComponent implements OnInit {

  iban: string;
  errorMsg = '';
  invalid = false;

  constructor() { }

  ngOnInit() {
  }

  check(): string{
    console.log(this.iban);
    if(this.iban.length < 5){
      this.errorMsg = 'Der IBAN muss mindestens 5 Zeichen lang sein!';
      this.invalid = true;
      return this.errorMsg;
    }
    if(this.iban.length > 34){
      this.errorMsg = 'Der IBAN darf nicht länger als 34 Zeichen sein!';
      this.invalid = true;
      return this.errorMsg;
    }
    if(!this.isAlpha(this.iban.charCodeAt(0)) || !this.isAlpha(this.iban.charCodeAt(1))){
      this.errorMsg = 'Die ersten beiden Stellen müssen Großbuchstaben sein!';
      this.invalid = true;
      return this.errorMsg;
    }
    for(let i = 2; i < this.iban.length; i++){
      if(this.iban.charCodeAt(i)<48||this.iban.charCodeAt(i)>57){
        this.errorMsg = 'Alle Stellen außer den ersten Beiden müssen Zahlen sein!';
        this.invalid = true;
        return this.errorMsg;
      }
    }
    if(+this.iban.substr(2,4)!=this.getChecksum()){
      this.errorMsg = 'Prüfsumme ist falsch!';
      this.invalid = true;
      return this.errorMsg;
    }
    this.invalid = false;
    return '';
  }

  getChecksum(): number{
    let checkStr = this.iban.substring(4);
    checkStr += (this.iban.charCodeAt(0)-64+9).toString();
    checkStr += (this.iban.charCodeAt(1)-64+9).toString();
    checkStr += '00';
    console.log(checkStr);
    console.log((+checkStr));
    console.log((+checkStr)%97);
    console.log(98 - (+checkStr).valueOf() % 97);
    return 98 - (+checkStr) % 97;
  }

  getErrorMessage(){
    return this.errorMsg;
  }

  isAlpha(character: number): boolean{
    if((character>=65&&character<=90)){
      return true;
    }
    return false;
  }

}
