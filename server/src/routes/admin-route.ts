import { Router } from 'express'

import * as eventController from '../controllers/event-controller'

const router = Router()

router.get('/ping', (req, res) => res.json({ ping: true, admin: true }))

router.post('/events', eventController.addEvent)
router.patch('/events/:id', eventController.updateEvent)
router.get('/events', eventController.getAllEvent)
router.get('/events/:id', eventController.getOneEvent)
router.delete('/events/:id', eventController.removeEvent)

export default router
