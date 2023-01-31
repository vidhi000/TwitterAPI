import koa from "koa"
import Router from "koa-router"
import { DefaultError } from "../controllers/defaultController.js"
import { Home } from "../controllers/homeController.js"
import { hashtagSearch } from "../controllers/twitterController.js"

const router = new Router()

router.get("/Home",Home)
router.get('/hashtag/:tag',hashtagSearch)
router.all(/.*/,DefaultError)

export {router} 