import Loader from 'react-loader-spinner';
export default function AppLoader() {
  //other logic

  return (
    <Loader
      className="loader"
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={300} //3 secs
    />
  );
}
