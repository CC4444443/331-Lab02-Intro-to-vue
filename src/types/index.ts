export interface Event {
  id: number | string
  category?: string
  title: string
  description?: string
  location?: string
  date?: string
  time?: string
  petsAllowed?: boolean
  organizer?: string
}

