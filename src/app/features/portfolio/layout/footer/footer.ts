import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface FooterLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'twitter',
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: 'email',
    },
  ];

  quickLinks: FooterLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Learning', path: '/learning' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ];
}
