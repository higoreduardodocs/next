import { Router } from 'express'

import { validate } from '../middlewares/auth-middleware'
import * as eventController from '../controllers/event-controller'

const router = Router()

router.get('/ping', (req, res) => res.json({ ping: true, admin: true }))

const eventsRoute = '/events'
router.post(`${eventsRoute}`, validate, eventController.addEvent)
router.patch(`${eventsRoute}/:id`, validate, eventController.updateEvent)
router.get(`${eventsRoute}`, validate, eventController.getAllEvent)
router.get(`${eventsRoute}/:id`, validate, eventController.getOneEvent)
router.delete(`${eventsRoute}/:id`, validate, eventController.removeEvent)

export default router
