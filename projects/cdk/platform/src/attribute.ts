import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnInit,
} from "@angular/core";

@Directive({
  selector: "[ftcAttr]",
  standalone: true,
})
export class FtcAttr implements OnInit {
  @Input() ftcAttr: Record<string, boolean> = {};
  constructor(private _el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    for (const attr in this.ftcAttr) {
      if (this.ftcAttr[attr]) {
        const node = document.createAttribute(attr);
        this._el.nativeElement.setAttributeNode(node);
        this.renderer.setAttribute(this._el.nativeElement, attr, "");
      }
    }
  }
}
