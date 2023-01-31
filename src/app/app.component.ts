import { Component } from '@angular/core';

enum Styling {
  Red = "weak",
  Yellow = "medium",
  Green = "strong"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  segmentsStyles: string[] = ["", "", ""]
  strenghtStatus: string = "Empty"

  ngOnInit() : void {
    this.reset()
  }

  onPasswordChange(event: KeyboardEvent) : void {
    const value : string = (event.target as HTMLInputElement).value
    this.validatePassword(value);
  }

  validatePassword(pass: string) : void {

    if (pass.length === 0) {
      this.reset()
      return
    }

    const shortRegEx: RegExp = /(?=.{8,})/;
    if(!shortRegEx.test(pass)) {
      this.makeAllRed()
      return
    }

    const strongRegEx: RegExp = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.!@#\$%\^\&*\)\(+=._\-])/
    if (strongRegEx.test(pass)) {
      this.makeStrong()
      return
    }

    const mediumRegEx: RegExp = /((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[a-zA-Z])(?=.*[.!@#\$%\^\&*\)\(+=._\-]))|((?=.*[0-9])(?=.*[.!@#\$%\^\&*\)\(+=._\-]))/
    if (mediumRegEx.test(pass)) {
      this.makeMedium()
      return
    }

    const weakRegEx: RegExp = /(?=.*[a-zA-Z])|(?=.*[0-9])|(?=.*[.!@#\$%\^\&*\)\(+=._\-])/
    if (weakRegEx.test(pass)) {
      this.makeWeak()
      return
    }

    this.reset()
  }

  reset() : void {
    this.segmentsStyles = ["", "", ""]
    this.strenghtStatus = "Empty"
  }

  makeAllRed() : void {
    this.reset()
    this.segmentsStyles[0] = Styling.Red
    this.segmentsStyles[1] = Styling.Red
    this.segmentsStyles[2] = Styling.Red
    this.strenghtStatus = "Less than 8 characters"
  }

  makeWeak() : void {
    this.reset()
    this.segmentsStyles[0] = Styling.Red
    this.strenghtStatus = "Weak password"
  }

  makeMedium() : void {
    this.reset()
    this.segmentsStyles[0] = Styling.Yellow
    this.segmentsStyles[1] = Styling.Yellow
    this.strenghtStatus = "Medium password"
  }

  makeStrong() : void {
    this.reset()
    this.segmentsStyles[0] = Styling.Green
    this.segmentsStyles[1] = Styling.Green
    this.segmentsStyles[2] = Styling.Green
    this.strenghtStatus = "Strong password"
  }
}