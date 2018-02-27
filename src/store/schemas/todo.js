import { schema } from 'normalizr'

import category from 'store/schemas/category'

const todo = new schema.Entity('todos', {
  category,
})

export default todo
