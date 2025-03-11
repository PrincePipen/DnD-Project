export interface Quest {
  id: string;
  title: string;
  description: string;
  milestones: {
    progress: number;
    description: string;
    location: string;
  }[];
}

export const mainQuest: Quest = {
  id: 'main-quest',
  title: 'The Legend Begins',
  description: 'Your journey into legend starts in the small village of Willowbrook.',
  milestones: [
    {
      progress: 0,
      description: 'Start your journey in Willowbrook village',
      location: 'village'
    },
    {
      progress: 3,
      description: 'Venture into the Whispering Woods',
      location: 'forest'
    },
    {
      progress: 6,
      description: 'Discover the ancient ruins',
      location: 'dungeon'
    },
    // Add more milestones as needed
  ]
};