import React from 'react';
import GraphqlLogo from '../../assets/graphql_logo.svg';

const Welcome = () => (
  <section className="welcome">
    <h2 className="welcome-header">A query language for your API</h2>
    <hr />
    <div className="welcome-main container">
      <GraphqlLogo className="welcome-logo" />
      <p className="welcome-text">
        <i>GraphQL</i> is a query language for APIs and a runtime for fulfilling
        those queries with your existing data. GraphQL provides a complete and
        understandable description of the data in your API, gives clients the
        power to ask for exactly what they need and nothing more, makes it
        easier to evolve APIs over time, and enables powerful developer tools.
      </p>
    </div>
  </section>
);

export default Welcome;
