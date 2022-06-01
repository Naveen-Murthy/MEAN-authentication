import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  preview: boolean = false;

  @Output() imgFile: EventEmitter<any> = new EventEmitter();

  constructor(
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.imgFile.emit(base64ToFile(this.croppedImage));
    this.imgFile.emit(this.croppedImage);
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
    this.toast.error(
      'Unable to load image',
      'Error'
    );
  }

  selectAnother() {
    this.imageChangedEvent = '';
    this.preview = false;
  }
}
