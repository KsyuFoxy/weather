import { Component} from '@angular/core';
import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';

@Directive({
    selector:'[color-spectrum]'
})
export class ColorSpectrumDirective {

    private _defaulColor = 'lavender';
    @Input('color-spectrum') highlightColor: string;

    constructor(private el:ElementRef,private render:Renderer){
     }

     @HostListener('mouseenter') methodToHandleMouseEnterAction(){
         console.log(this.highlightColor);
         this.changecolor(this.highlightColor || this._defaulColor);
    }

     @HostListener('mouseleave') methodToHandleMouseExitAction(){
         console.log(this.highlightColor);
         this.changecolor(null);
    }

      private changecolor(color: string) {
         this.render.setElementStyle(this.el.nativeElement, 'background-color', color);
    }
}

// @Component({
//   selector: 'my-tasks',
//   template: `
//     <div (click)="color='#ec6a96'" [ngStyle]="{'background-color': '#ec6a96'}"></div>
//     <div (click)="color='#6262ea'" [ngStyle]="{'background-color': '#6262ea'}"></div>
//     <div (click)="color='yellow'" [ngStyle]="{'background-color': 'yellow'}"></div>
//     <div (click)="color='#5ff45f'" [ngStyle]="{'background-color': '#5ff45f'}"></div>
//     <div (click)="color='#fb60fb'" [ngStyle]="{'background-color': '#fb60fb'}"></div>
//
//     <p [color-spectrum]="color">I like this color</p>
//   `,
//   styleUrls: [ './color.component.css' ]
// })
// export class ColorsComponent {
//
// }
// https://www.infragistics.com/community/blogs/dhananjay_kumar/archive/2016/11/01/what-is-attribute-directives-in-angular-2.aspx
