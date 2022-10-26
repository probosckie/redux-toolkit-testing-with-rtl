import { useGetPeopleQuery } from './apiSlice';

function App() {
  const { data, isLoading } = useGetPeopleQuery();

  return (
    <div className="App">{isLoading ? 'Loading data from api' : data.name}</div>
  );
}

export default App;
