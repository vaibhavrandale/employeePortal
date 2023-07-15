export default function MsgBox(props) {
  return (
    // <div className="container3">
    <div className={props.className || 'info '} style={{ width: '200px' }}>
      {props.children}
    </div>
    // </div>
  );
}
