import '../../App.css';

export default function AlertBox(props) {
  return (
    // <div className="container3">
    <div
      style={{ maxWidth: '400px', margin: '10px auto' }}
      className={props.className || 'info'}
    >
      {props.children}
    </div>
    // </div>
  );
}
