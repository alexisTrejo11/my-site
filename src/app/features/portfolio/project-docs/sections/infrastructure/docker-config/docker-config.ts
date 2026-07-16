import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { DockerFile } from '../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-docker-config',
  imports: [CommonModule],
  templateUrl: './docker-config.html',
})
export class DockerConfig implements OnInit {
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
