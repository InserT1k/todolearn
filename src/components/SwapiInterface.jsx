import React from 'react';

const SwapiInterface = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">SWAPI</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="URL"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" disabled>
            Get Info
          </button>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title">Response Data</h5>
        </div>
        <div className="card-body">
          <pre className="bg-light p-3">
           </pre>
        </div>
      </div>
    </div>
  );
};

export default SwapiInterface;
