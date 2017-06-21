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

     @HostListener('click') methodToHandleMouseEnterAction(){
         console.log(this.highlightColor);
         this.changecolor(this.highlightColor || this._defaulColor);
    }

      private changecolor(color: string) {
         this.render.setElementStyle(this.el.nativeElement, 'background-color', color);
    }
}
