import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FtcLayout } from "@freshthought/material/layout";

@Component({
  selector: 'ftc-layout-doc',
  standalone: true,
  imports: [FtcLayout, MatIconModule, MatButtonModule],
  templateUrl: './layout-doc.component.html',
  styleUrl: './layout-doc.component.scss'
})
export class LayoutDocComponent {

}
