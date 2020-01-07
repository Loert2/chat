import { createActions } from 'redux-actions';
import { asyncActions, loadActions } from '../../utils/constants';

export const { user } = createActions({
   USER: { 
      CREATE_OR_LOAD: asyncActions,
      ...loadActions
   }
});