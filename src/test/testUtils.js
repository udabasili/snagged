import { applyMiddleware, createStore } from "redux";
import rootReducer from "../redux/rootReducer";
import {  middleware } from "../redux/store";
import checkPropTypes from 'check-prop-types';

export const storeFactory = (initialState) => {
     const storeFactoryWithMiddleware = applyMiddleware(...middleware)(createStore)
     return storeFactoryWithMiddleware(rootReducer, initialState)
}

export const findByAttribute = (wrapper, component) => {
     return wrapper.find(component)
}


export const propsCheck = (component, props) =>{
     const checkPropsError = checkPropTypes(component.propTypes, props, 'props', component.name)
     expect(checkPropsError).toBeUndefined()
}