export default function AlertBox1(props) {
  return (
    // <div className="container3">
    <div className={props.className || 'info 1'}>{props.children}</div>
    // </div>
  );
}
