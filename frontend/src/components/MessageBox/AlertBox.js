import '../../App.css';

export default function AlertBox(props) {
  return (
    // <div className="container3">
    <div className={props.className || 'info'}>{props.children}</div>
    // </div>
  );
}
