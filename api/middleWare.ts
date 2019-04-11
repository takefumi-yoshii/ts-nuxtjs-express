import * as Express from 'express'

export default function (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction)
 {
  console.log(req.method)
  next()
}
