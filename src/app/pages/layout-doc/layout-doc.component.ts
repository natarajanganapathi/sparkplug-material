import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FtcLayout } from "@freshthought/material/layout";

@Component({
  selector: 'ftc-layout-doc',
  standalone: true,
  imports: [FtcLayout, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './layout-doc.component.html',
  styleUrl: './layout-doc.component.scss'
})
export class LayoutDocComponent {

}
