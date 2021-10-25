import { MDCDialog, strings } from '@material/dialog'
import { MDCSelect } from '@material/select'

if (process.env.NODE_ENV === 'development') {
  require('./index.html')
}

const dialog = new MDCDialog(document.querySelector('.mdc-dialog'))
const select = new MDCSelect(document.querySelector('.mdc-select'))

function showDialog ({ isFixed }) {
  select.menu.setFixedPosition(isFixed)
  dialog.open()
}

document.getElementById('showDefault').addEventListener('click', () => showDialog({ isFixed: false }))
document.getElementById('showFixed').addEventListener('click', () => showDialog({ isFixed: true }))

document.getElementById('showWorkaround').addEventListener('click', () => {
  const closeMenu = () => select.menu.menuSurface.close()

  window.addEventListener('resize', closeMenu)

  const dialogClosed = () => {
    window.removeEventListener('resize', closeMenu)
    dialog.root.removeEventListener(strings.CLOSED_EVENT, dialogClosed)
  }

  dialog.root.addEventListener(strings.CLOSED_EVENT, dialogClosed)

  showDialog({ isFixed: true })
})
