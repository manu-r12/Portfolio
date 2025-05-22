import React from 'react';
import { FaFolder } from 'react-icons/fa';

export type ProjectTab = 'featured' | 'past';

export interface ProjectItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
  link?: string;
  image?: string;
}

export const projects: Record<ProjectTab, ProjectItem[]> = {
  'featured': [
    {
      title: 'OneBusAway iOS Widget(Open Source Contribution)',
      description: 'Modernized widget system for the OneBusAway iOS app, enhancing real-time transit data updates used by over 100,000 users.',
      icon: <FaFolder className="w-6 h-6 text-black" />,
      tags: ['Swift', 'SwiftUI', 'WidgetKit'],
      link: 'https://github.com/OneBusAway/onebusaway-ios/pull/753',
      image: '/images/widget.mp4'
    },
    {
      title: 'ForgetMeNot',
      description: 'An AR-powered iOS app that helps users locate misplaced items using augmented reality. Winner of Apple\'s Swift Student Challenge 2025.',
      icon: <FaFolder className="w-6 h-6 text-black" />,
      tags: ['Swift', 'SwiftUI', 'ARKit', 'RealityKit', 'Swift Data'],
      link: 'https://github.com/manu-r12/ForgetMeNot',
      image: '/images/ar.png'
    },
    {
      title: 'FlappyBird 3D',
      description: 'A 3D version of FlappyBird controlled by hand gestures using computer vision and Python.',
      icon: <FaFolder className="w-6 h-6 text-black" />,
      tags: ['Python', 'OpenCV', 'Pygame', 'MediaPipe'],
      link: 'https://github.com/your-username/flappybird-3d',
      image: '/images/flappy.png'
    }
  ],
  'past': [
    {
      title: 'Drawyy',
      description: 'A collaborative web application for real-time drawing and generative art creation with live updates.',
      icon: <FaFolder className="w-6 h-6 text-gray-700" />,
      tags: ['Next.js', 'FastAPI', 'MongoDB', 'WebSocket'],
      link: 'https://github.com/your-username/drawyy',
      image: '/images/drawyy.png'
    },
    {
      title: 'Planto',
      description: 'An iOS Reminder application that helps users track and water their plants using CoreML for plant species identification and Wikipedia API integration.',
      icon: <FaFolder className="w-6 h-6 text-black" />,
      tags: ['Swift', 'SwiftUI', 'CoreML', 'Wikipedia API'],
      link: 'https://github.com/manu-r12/Planto',
      image: '/images/planto.png'
    }
  ]
};