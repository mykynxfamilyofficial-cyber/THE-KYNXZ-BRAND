import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import contactSubmission from './contactSubmission'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, contactSubmission],
}
