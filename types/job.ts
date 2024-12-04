export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  applyLink: string;
  postedTime: string;
  postedDateTime: string;
  description?: string;
} 