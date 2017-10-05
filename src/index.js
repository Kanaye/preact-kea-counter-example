// Quick 'n diry example so everything is in one file
import { render, h, Component } from 'preact';
import { kea, getStore} from 'kea';
import PropTypes from 'prop-types';

const store = getStore({
	paths: ['counter']
});

const counterLogic = kea({
    actions: () => ({
        increment: (amount) => ({ amount }),
        decrement: (amount) => ({ amount })
    }),

    reducers: ({ actions }) => ({
        counter: [0, PropTypes.number, {
            [actions.increment]: (state, payload) => state + payload.amount,
            [actions.decrement]: (state, payload) => state - payload.amount
        }]
    }),

    selectors: ({ selectors }) => ({
        doubleCounter: [
            () => [selectors.counter],
            (counter) => counter * 2,
            PropTypes.number
        ]
    })
});

class Counter extends Component {
	render() {
		const { counter, doubleCounter } = this.props;
		const { increment, decrement } = this.actions;
		const incrementOne = () => increment(1);
		const decrementOne = () => decrement(1);

		return (
 			<div className='kea-counter'>
    	    	Count: {counter}
        		<br />
        		Doublecount: {doubleCounter}
        		<br />
        		<button onClick={incrementOne}>Increment</button>
        		<button onClick={decrementOne}>Decrement</button>
      		</div>
		);
	}
}

const WrappedCounter = counterLogic(Counter);

render(<WrappedCounter store={store}/>, document.body);