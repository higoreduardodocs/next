import { Router } from 'express'

import * as authMiddleware from '../middlewares/auth-middleware'
import * as eventController from '../controllers/event-controller'

const router = Router()

router.get('/ping', (req, res) => res.json({ ping: true, admin: true }))

router.post('/events', authMiddleware.validate, eventController.addEvent)
router.patch(
  '/events/:id',
  authMiddleware.validate,
  eventController.updateEvent
)
router.get('/events', authMiddleware.validate, eventController.getAllEvent)
router.get('/events/:id', authMiddleware.validate, eventController.getOneEvent)
router.delete(
  '/events/:id',
  authMiddleware.validate,
  eventController.removeEvent
)

export default router
