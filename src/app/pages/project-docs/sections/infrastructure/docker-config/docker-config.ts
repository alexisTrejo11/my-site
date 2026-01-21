import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DockerFile } from '../../../../../core/models/docs/infrastructure';

@Component({
  selector: 'app-docker-config',
  imports: [CommonModule],
  templateUrl: './docker-config.html',
})
export class DockerConfig {
  selectedFile: DockerFile | null = null;
  dockerFiles = input.required<DockerFile[]>();

  ngOnInit() {
    this.selectedFile = this.dockerFiles()[0];
  }

  selectFile(file: DockerFile) {
    this.selectedFile = file;
  }
  copyToClipboard() {
    if (this.selectedFile) {
      navigator.clipboard.writeText(this.selectedFile.content);
    }
  }
}
