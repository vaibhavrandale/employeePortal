import './loader4.css';

export default function LoadingBox4() {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{
        fontSize: '15px',
        borderWidth: '2px',
        height: '15px',
        width: '15px',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
