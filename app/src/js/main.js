import '@sass/style.scss'
import '@js/features/serviceWorkerRuntime'

import Navigo from 'navigo'
import HomePage from '@page/Home'

const root = null
const useHash = true // Defaults to: false
const hash = '#!' // Defaults to: '#'
const router = new Navigo(root, useHash, hash)

router.on('/', HomePage).resolve()

// 404 script
router.notFound(() => {})
