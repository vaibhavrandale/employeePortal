export default function MsgBox(props) {
  return (
    // <div className="container3">
    <div
      className={props.className || 'info '}
      style={{ maxWidth: '400px', margin: 'auto' }}
    >
      {props.children}
    </div>
    // </div>
  );
}
