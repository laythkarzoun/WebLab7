import { useEffect, useReducer } from 'react';

const initialState = { loading: true, error: null, data: null };
function reducer(state, action) {
  switch (action.type) {
    case 'START': return { loading: true, error: null, data: null };
    case 'SUCCESS': return { loading: false, error: null, data: action.data };
    case 'ERROR': return { loading: false, error: action.error, data: null };
    default: return state;
  }
}

// The fetcher receives an AbortSignal. Each component using this hook owns its own state.
export function useFetch(fetcher, dependencies) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'START' });
    Promise.resolve()
      .then(() => fetcher(controller.signal))
      .then((data) => { if (!controller.signal.aborted) dispatch({ type: 'SUCCESS', data }); })
      .catch((error) => {
        if (!controller.signal.aborted) dispatch({ type: 'ERROR', error: error.message || 'Something went wrong' });
      });
    return () => controller.abort();
    // Dependencies are supplied by each caller and include values used by its stable fetcher.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, ...dependencies]);

  return state;
}
