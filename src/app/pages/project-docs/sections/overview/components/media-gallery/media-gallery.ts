import { Component, input, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectMediaItem } from '../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-media-gallery',
  imports: [],
  templateUrl: './media-gallery.html',
  styles: [
    `
      :host {
        display: block;
      }

      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .line-clamp-2 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    `,
  ],
})
export class MediaGallery {
  mediaItems = input<ProjectMediaItem[]>();
  sectionTitle = input<string>('Media Gallery');
  sectionDescription = input<string>('');
  mediaOpened = new EventEmitter<ProjectMediaItem>();
  mediaClosed = new EventEmitter<void>();

  selectedMedia: ProjectMediaItem | null = null;
  currentIndex: number = 0;
  isLoading: boolean = true;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mediaItems']) {
      this.currentIndex = 0;
    }
  }

  openMedia(media: ProjectMediaItem): void {
    this.selectedMedia = media;
    this.currentIndex = this.mediaItems()?.indexOf(media) ?? 0;
    this.isLoading = true;
    this.mediaOpened.emit(media);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeMedia(): void {
    this.selectedMedia = null;
    this.mediaClosed.emit();

    // Restore body scroll
    document.body.style.overflow = '';
  }

  nextMedia(event: Event): void {
    event.stopPropagation();
    if (this.mediaItems && this.mediaItems.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.mediaItems.length;
      this.selectedMedia = this.mediaItems()![this.currentIndex];
      this.isLoading = true;
    }
  }

  prevMedia(event: Event): void {
    event.stopPropagation();
    if (this.mediaItems && this.mediaItems.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
      this.selectedMedia = this.mediaItems()![this.currentIndex];
      this.isLoading = true;
    }
  }

  // TODO: Implement actual download logic
  downloadMedia(media: ProjectMediaItem): void {
    // trigger a download
    console.log('Downloading:', media.url);
  }

  openInNewTab(media: ProjectMediaItem): void {
    window.open(media.url, '_blank', 'noopener,noreferrer');
  }

  isVideoUrl(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) !== null;
  }

  onImageLoad(): void {
    this.isLoading = false;
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
