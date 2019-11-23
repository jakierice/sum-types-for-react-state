import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Spinner from '@atlaskit/spinner';
import {ProfileCard} from '@atlaskit/profilecard';
import styled from 'styled-components';

import {CardState, Loading, LoadingError, Display} from './states';

// Simple function to build a URL.
function apiURL(email) {
    return `/data.json?email=${encodeURIComponent(email)}`;
}

// Load the data.
function loadData(email, setState) {
    fetch(apiURL(email))
        .then(response => response.json())
        .then(data => setState(new Display(data)))
        .catch(err => setState(new LoadingError(err)));
}

// A component to display if we have an error.
const ErrorCard = () => (
    <ProfileCard errorType={{reason: 'default'}} hasError />
);

// Our display logic. We expect the state argument to be
// a CardState instance
function renderComponent(state) {
    // Here we check the type of state. If it's not an instance
    // of CardState, something is wrong.
    if (!(state instanceof CardState)) {
        throw new Error('State must be an instance of CardState');
    }

    // Create a mapping between  states and React elements to display.
    const stateMap = {
        Loading: () => <Spinner />,
        LoadError: () => <ErrorCard />,
        Display: s => <ProfileCard {...s.data} />,
    };

    // Select which element to render, based on current state
    // or fall back to an error card.
    const component = stateMap[state.constructor.name] || (() => <ErrorCard />);
    return component(state);
}

// Our component with everything tied together.
export function UserCard({email}) {
    // Initialise our hooks.
    const [state, setState] = useState(new Loading());
    useEffect(() => loadData(email, setState), [email]);

    return renderComponent(state);
}

const App = styled.div`
    padding: 1em;
    margin: 0 auto;
    max-width: 21.5rem;
`;

const rootElement = document.getElementById('root');
ReactDOM.render(
    <App>
        <UserCard email="james@example.com" />
    </App>,
    rootElement,
);
