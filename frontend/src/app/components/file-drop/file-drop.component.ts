import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FilePickerDirective, ReadFile, ReadMode } from 'ngx-file-helpers';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss'],
})
export class FileDropComponent implements OnInit {

  public readMode = ReadMode.dataURL;
  @Output() drop: EventEmitter<any> = new EventEmitter();

  @ViewChild("filePicker", { static: false })
  private filePicker: FilePickerDirective | null = null;

  public isHover: boolean = false;
  public files: Array<ReadFile> = [];

  constructor(
  ) {}

  ngOnInit(): void {}

  addFile(file: ReadFile) {
    this.drop.emit(file.content);
  }

  public status: string | null = null;


  ignoreTooBigFile(file: File): boolean {
    return file.size < 10000000;
  }

  onReadStart(fileCount: number) {
    this.status = `Reading ${fileCount} file(s)...`;
  }

  onFilePicked(file: ReadFile) {
    this.addFile(file);
  }

  onReadEnd(fileCount: number) {
    this.status = `Read ${fileCount} file(s) on ${new Date().toLocaleTimeString()}.`;
    if (this.filePicker !== null) {
      this.filePicker.reset();
    }
  }
}
