import { fromJS } from 'immutable'
import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  drawerOpen: [],
  drawerClose: [],
  drawerToggle: []
}, {}) 

// the initial state of this reducer
export const INITIAL_STATE = fromJS({ 
  open: false
})

const open = (state = INITIAL_STATE, action) => state.set('open', true)
const close = (state = INITIAL_STATE, action) => state.set('open', false)
const toggle = (state = INITIAL_STATE, action) => state.set('open', !state.get('open'))


// map our action types to our reducer functions
const HANDLERS = {
  [Types.DRAWER_OPEN]: open,
  [Types.DRAWER_CLOSE]: close,
  [Types.DRAWER_TOGGLE]: toggle
}

// export our *NAMED* actions + selectors, and our reducer
export default createReducer(INITIAL_STATE, HANDLERS)
export const DrawerActions = Creators
export const DrawerSelectors = {
  drawer: state => state.app.drawer,
  open: state => state.app.drawer.get('open')
}
