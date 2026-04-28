export interface Bug {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | string;
  category: string;
  rootcause: string;
  status: 'Open' | 'In Progress' | 'Closed' | string;
  assignedTo: string;
  createdDate: string;
}

export interface Bugreq {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | string;
  category: string;
  rootcause: string;
  status: 'Open' | 'In Progress' | 'Closed' | string;
  assignedTo: string;
}
