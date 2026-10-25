export type ServiceCategory = 
  | 'all' 
  | 'endodontics' 
  | 'cosmetics' 
  | 'orthodontics' 
  | 'implants' 
  | 'preventative';

export interface DentalService {
  id: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  duration: string;
  recovery: string;
  comfortLevel: string;
  priceEstimate: string;
  idealFor: string[];
  protocolSteps: { title: string; desc: string }[];
  beforeImage?: string;
  afterImage?: string;
  features: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  degrees: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  philosophy: string;
  specializations: string[];
  availability: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientType: 'new' | 'returning';
  serviceId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'cancelled' | 'rescheduled';
  createdAt: string;
}

export interface PatientTestimonial {
  id: string;
  author: string;
  location: string;
  treatment: string;
  category: ServiceCategory;
  rating: number;
  date: string;
  quote: string;
  outcomeNote: string;
  verified: boolean;
}

export interface AnatomicalLayer {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  microscopeZoom: string;
  description: string;
  clinicalRelevance: string;
  pointerPosition: { x: number; y: number };
}
