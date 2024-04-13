import { Router } from 'express'

import { getOneEvent } from '../controllers/event-controller'
import { searchPerson } from '../controllers/people-controller'

const router = Router()

router.get('/ping', (req, res) => res.json({ pong: true }))

router.get('/events/:id', getOneEvent)
router.get('/events/:eventId/search', searchPerson)

export default router
