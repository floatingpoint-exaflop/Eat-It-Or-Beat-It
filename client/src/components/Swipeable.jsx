import { useSwipeToDismiss } from 'react-swipe-to-dismiss';

const MessageItem = () => {
  const ref = useRef();
  useSwipeToDismiss(ref, onDismiss, false, 50, 'right');

  return (
    <div className="Message" ref={ref}>
      Your changes has been saved.
    </div>
  );
}
