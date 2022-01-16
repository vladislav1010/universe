import {client, q} from './connection'

export interface Feedback {
  name: string
  email: string
  interestedIn: string[]
  cost?: string
  image?: string
}

const feedbackCollectionName = 'feedback'

export async function createFeedback(data: Feedback) {
  return client().query(q.Create(q.Collection(feedbackCollectionName), {data}))
}
