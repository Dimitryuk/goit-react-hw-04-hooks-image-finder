import { ImSpinner } from 'react-icons/im';

export default function Loader() {
  return (
    <div className="spinner">
      <div>
        <ImSpinner size="35" className="icon-spiner" />
        Loading...
      </div>
    </div>
  );
}
