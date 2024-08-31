import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, clearData } from '../redux/actions';

const SwapiInterface = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);

  const handleFetchData = () => {
    if (url) {
      dispatch(fetchData(url));
    }
  };

  const handleClearData = () => {
    dispatch(clearData());
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">SWAPI</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={handleFetchData}>
            Get Info
          </button>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title">Response Data</h5>
        </div>
        <div className="card-body">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          <pre className="bg-light p-3">
            {data ? JSON.stringify(data, null, 2) : 'No Data'}
          </pre>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-danger" onClick={handleClearData}>
          Clear Data
        </button>
      </div>
    </div>
  );
};

export default SwapiInterface;
