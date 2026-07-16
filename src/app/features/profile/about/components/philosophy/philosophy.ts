import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PhilosophyInterface {
  title: string;
  description: string;
  iconPath: string;
  color: string;
}

@Component({
  selector: 'app-philosophy',
  imports: [CommonModule],
  templateUrl: './philosophy.html',
})
export class Philosophy {
  philosophies: PhilosophyInterface[] = [
    {
      title: 'Systems Thinking',
      description:
        "I don't just write code - I architect systems. My background in complex CAD software taught me to see the interconnected whole, not just isolated components. Every line of code is part of a larger ecosystem.",
      iconPath: 'icons/general/network.svg',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Depth Over Surface',
      description:
        "I learn technologies from the protocol up. Understanding how HTTPS handshakes work, why databases normalize data, and how compilers transform code gives me an engineer's perspective, not just a developer's.",
      iconPath: 'icons/general/knowledge.svg',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Autodidact by Nature',
      description:
        "My neurodivergent mind thrives on self-directed, systematic learning. I don't wait for courses - I dive into documentation, experiment, and build until the mental model clicks. This is how I mastered CAD tools, and how I master code.",
      iconPath: 'icons/general/learning.svg',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Practical Engineering',
      description:
        'I come from solving real-world problems in architecture and public works. This grounds my approach: technology exists to solve human problems. I focus on building systems that work reliably, scale efficiently, and serve actual needs.',
      iconPath: 'icons/general/server.svg',
      color: 'from-orange-500 to-red-500',
    },
  ];
}
