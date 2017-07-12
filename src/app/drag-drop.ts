import {Component, ElementRef, ViewChild, OnInit, Renderer} from '@angular/core';

@Component({
    selector: 'drag-drop',
    template: `<div #canvas (mousemove)='onMousemove($event)' class='canvas'>
                    <div #element class='element' (mouseup)='onMouseup($event)' (mousedown)='onMousedown($event)'>
                        <img (mouseenter)="hover=true;" (mouseleave)="hover=false;" src='./src/app/images/sun.png'>
                        <span *ngIf='hover'>Move me</span>
                    </div>
                </div>`,
    styles: [`
        .canvas {
            border: 1px solid green;
            width: 500px;
            height: 200px;
            margin: 45px auto;
        }
        .element {
            position: absolute;
            width: 40px;
            height: 40px;
            cursor: move;
        }
        img {
            width: 40px;
            height: 40px;
            objekt-fit: cover;
        }
        span {
            font-size: 14px;
        }
        `]
})
export class DragDropComponent implements OnInit {
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('element') element: ElementRef;

    private container;
    private movableEl;
    private moveBorder;
    private mouseMove: MouseEvent;

    private mouseDown : boolean = false;
    constructor(private renderer: Renderer) {}

    ngOnInit() {
        this.container = this.canvas.nativeElement;
        this.movableEl = this.element.nativeElement;

        this.moveBorder = {
            left : this.container.offsetLeft + (40 / 2),
            right : this.container.clientWidth + this.container.offsetLeft - (40 / 2) + 2,
            top : this.container.offsetTop + (40 / 2) + 85,
            bottom : this.container.clientHeight + this.container.offsetTop - (40 / 2) + 87,
        }
    }
    private onMouseup(event) {
        this.mouseDown = false;
        event.stopPropagation();
    }
    private onMousedown(event) {
        event.preventDefault();
        this.mouseDown = true;
        this.mouseMove = event;
    }
    private onMousemove(event: MouseEvent) {
        if(this.mouseDown && this.InsideBorderEvent(event)) {
            this.renderer.setElementStyle(this.movableEl, 'left', event.clientX - (40 / 2) + "px");
            this.renderer.setElementStyle(this.movableEl, 'top', event.clientY - (40 / 2) + "px");
        }
    }
    InsideBorderEvent(event: MouseEvent) {
        return event.clientX > this.moveBorder.left &&
            event.clientX < this.moveBorder.right &&
            event.clientY > this.moveBorder.top &&
            event.clientY < this.moveBorder.bottom;
    }


}
